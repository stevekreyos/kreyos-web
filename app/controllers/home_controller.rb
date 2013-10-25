class HomeController < ApplicationController
  before_filter :check_admin_session, :except => ['login_temp', 'admin_signout']
  
  def home
    render :layout => "home"
  end
  
  def login_temp
    user = Account.find_by_sql("SELECT * FROM accounts where email = '#{params[:username]}' AND password = '#{params[:password]}'").first
    
    if !user.nil?
      redirect_to :action => "home"
      session[:admin_user] = user['id'].to_s
    else
      redirect_to "/"
    end
  end
  
  def admin_signout
    session[:admin_user] = nil
    redirect_to "/"
  end
end