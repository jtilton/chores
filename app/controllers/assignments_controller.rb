class AssignmentsController < ApplicationController

  # params: :previous_end_date, :click in ["forward", "backward", "initial"]
  def fetch
    params[:previous_end_date] ||= App.initial_end_date
    previous_end_date = Date.parse(params[:previous_end_date])
    result = {}
    if params[:click] == "forward"
      result[:end_date] = previous_end_date + 7.days
    elsif params[:click] == "backward"
      result[:end_date] = previous_end_date - 7.days
    else
      result[:end_date] = App.initial_end_date
    end
    result[:groups] = App.groups(result[:end_date])
    result[:date_range] = DateUtils.dates_of_week_ending_on(result[:end_date])

    render :json => result
  end
end
