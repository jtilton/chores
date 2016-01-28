class App

  DAY_OF_WEEK = "Tuesday"
  SEED_OFFSET = 2
  FLOORS = [1, 2]

  def self.countdown_string
    date = Date.parse(DAY_OF_WEEK)
    date = date + (date >= Date.today ? 0 : 7)
    days_remaining = (date - Date.today).to_i
    day_string = days_remaining == 1 ? "day" : "days"
    "Chores due by #{date.strftime("%a %-m/%-d")} (in #{days_remaining} #{day_string})"
  end

  def self.roommates_for_floor(floor)
    Roommate::FLOORS.keys.select{|k| Roommate::FLOORS[k]==floor}.map do |id|
      names = Roommate::NAMES[id].split
      p = Roommate.new({
        :id => id,
        :first_name => names[0],
        :last_name => names[1],
      })
      {
        :first_name => names[0],
        :mapping => p.current_mapping,
        :photo_path => p.photo_path,
        :task => {
          :name => Task::NAMES[p.task],
          :details => Task::DESCRIPTIONS[p.task],
        }
      }
    end
  end

  def self.generate_mappings
    previous_offset = offset
    App::FLOORS.each do |f|
      current_floor = Roommate::FLOORS.keys.select{|k| Roommate::FLOORS[k]==f}
      current_floor.each_with_index.map do |id, i|
        task_id = (i + previous_offset) % Task::NUM_TASKS
        Mapping.new({
          :roommate_id => id,
          :task_id => task_id,
          :offset => previous_offset,
          :ds => Date.today}).save!
      end
    end
  end

  def self.offset
    ((Mapping.last.try(:offset) || SEED_OFFSET) + 1) % Task::NUM_TASKS
  end

end
