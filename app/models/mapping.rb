class Mapping < ActiveRecord::Base
  def self.get_assignments_for_end_date(end_date)
    end_date = Date.parse(end_date) if end_date.is_a? String
    start_date = end_date - 7.days
    assignments = Mapping.where("ds between '#{start_date}' and '#{end_date}'")
    if assignments.empty?
      App.generate_mappings(start_date + 1.day)
      assignments = Mapping.where("ds between '#{start_date}' and '#{end_date}'")
    end
    # pick only the first in range for each roommate
    assignments = assignments.select("DISTINCT ON(roommate_id)*").order("roommate_id, ds ASC")
  end

  def present
    {
      :id => id,
      :done => !!completed_at,
      :roommate => roommate,
      :task => {
        :name => Task::NAMES[task_id],
        :details => Task::DESCRIPTIONS[task_id],
      },
    }
  end

  def roommate
    r = Roommate.new({:id => roommate_id})
    {
      :first_name => r.first_name,
      :photo_path => r.photo_path,
    }
  end

end
