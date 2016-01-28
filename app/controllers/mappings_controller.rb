class MappingsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def update
    mapping = Mapping.find(params[:id])
    if mapping.completed_at
      mapping.completed_at = nil
    else
      mapping.completed_at = Time.now
    end
    mapping.save!

    render :json => { :success => "success", :status_code => "200" }
  end

end
