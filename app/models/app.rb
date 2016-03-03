class App

  DAY_OF_WEEK = "Tuesday"
  PERIOD = 7.days
  SEED_OFFSET = 2
  GROUPS = ["Floor 1", "Floor 2"]

  def self.countdown_string
    date = DateUtils.next_xday_of_week(DAY_OF_WEEK)
    day_string = self.days_remaining == 1 ? "day" : "days"
    "Chores due by #{date.strftime("%a %-m/%-d")} "\
      "(in #{days_remaining} #{day_string})"
  end

  def self.days_remaining
    date = DateUtils.next_xday_of_week(DAY_OF_WEEK)
    days_remaining = (date - Date.today).to_i
  end

  def self.initial_end_date
    DateUtils.next_xday_of_week(App::DAY_OF_WEEK)
  end

  def self.initial_date_range
    DateUtils.dates_of_week_ending_on(initial_end_date)
  end

  def self.groups(end_date=Date.today)
    assignments = Mapping.get_assignments_for_end_date(end_date)

    groups = App::GROUPS.map{|x| []}
    assignments.each do |a|
      groups[Roommate::GROUPS[a.roommate_id]].push(a.present)
    end
    groups
  end

  def self.photo_paths
    Roommate::NAMES.keys.map { |id| Roommate.new({:id => id}).photo_path }
  end

  def self.generate_mappings(date=Date.today)
    current_offset = offset
    assignments = []
    App::GROUPS.each_with_index do |g, i|
      current_group = Roommate::GROUPS.keys.select{|k| Roommate::GROUPS[k]==i}
      current_group.each_with_index.map do |id, j|
        task_id = (j + current_offset) % current_group.length
        assignment = Mapping.new({
          :roommate_id => id,
          :task_id => task_id,
          :offset => current_offset,
          :ds => date})
        assignment.save!
        assignments.push(assignment)
      end
    end
    assignments
  end

  def self.offset
    ((Mapping.last.try(:offset) || SEED_OFFSET) + 1) % Task::NUM_TASKS
  end

end
