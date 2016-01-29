class DateUtils

  def self.next_xday_of_week(day_of_week)
    date = Date.parse(day_of_week)
    date = date + (date >= Date.today ? 0 : 7)
  end

  def self.dates_of_week_ending_on(end_date)
    end_date = Date.parse(end_date) if end_date.is_a? String
    start_date = end_date - 6.days
    start_date.strftime("%-m/%-d-") + end_date.strftime("%-m/%-d")
  end

end
