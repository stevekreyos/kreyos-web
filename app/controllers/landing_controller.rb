class LandingController < ApplicationController
  before_filter :check_if_logged_in
  
  def landing
    render :layout => 'landing_page'
  end
  
  def order_id
    order_id = JsonParser.new("users/order_id", { order_id: params[:order_id] })
    
    if order_id == 0
      session[:order_error_modal] = 1
      redirect_to :action => "landing"
    elsif order_id == 1
      session[:error_modal] = 1
      redirect_to :action => "landing"
    else
      session[:user_id] = order_id['id']
      redirect_to :controller => "users", :action => "home"  
    end
  end
end