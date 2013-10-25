class PublicController < ApplicationController
  before_filter :check_referral_parameter
  
  def facebook_authentication
    # raise request.env["omniauth.auth"].to_yaml
    auth = request.env["omniauth.auth"]
    user = JsonParser.new("users/facebook", { provider: auth["provider"], uid: auth["uid"], name: auth["info"]["name"], email: auth["info"]["email"], oauth_token: auth['credentials']['token'], gender: auth['extra']['raw_info']['gender'], birthday: auth['extra']['raw_info']['birthday'], nickname: auth['extra']['raw_info']['username']})
    
    if user == 0
      #session[:order_modal] = 1
      redirect_to :controller => "home", :action => "home"
    elsif user == 1
      session[:error_modal] = 1
      redirect_to :controller => "home", :action => "home"      
    else
      session[:user_id] = user['id']
      check_profile = JsonParser.new("users/check/profile/#{session[:user_id]}") # => Check if profile is complete

      unless check_profile['bv_status'] == 1
        session[:profile] = 1
        cookies[:total_progress_precentage] = 40
        
        if check_profile['height_value'].nil?
          session[:modal_height] = 1
        else
          session[:modal_height] = nil
          cookies[:total_progress_precentage] += 10
        end
         
        if check_profile['weight_value'].nil?
          session[:modal_weight] = 1
        else
          session[:modal_weight] = nil
          cookies[:total_progress_precentage] += 10
        end
        
        if check_profile['distance'].nil?
          session[:modal_distance] = 1
        else
          session[:modal_distance] = nil
          cookies[:total_progress_precentage] += 10
        end
        
        if check_profile['country'].nil?
          session[:modal_country] = 1
        elsif check_profile['city'].nil?
          session[:modal_country] = 1
        elsif check_profile['zip'].nil?
          session[:modal_country] = 1
        else
          session[:modal_county] = nil
          cookies[:total_progress_precentage] += 30
        end
      end
      
      redirect_to :controller => "users", :action => "dashboard" 
    end
    
  end
  
  def rewards
    @rewards = JsonParser.new("badgeville/reward/#{params[:type]}/#{session[:user_id]}")
    render :json => @rewards
  end
  
  def offers
    if session[:user_id].nil?
      render :layout => "application"
    else
      render :layout => "users"
    end
  end
  
  def about
    if session[:user_id].nil?
      render :layout => "application"
    else
      render :layout => "users"
    end
  end
  
  def blog
    if session[:user_id].nil?
      render :layout => "application"
    else
      render :layout => "users"
    end
  end 
  
  def help
    if session[:user_id].nil?
      render :layout => "application"
    else
      render :layout => "users"
    end
  end
  
  def terms
    if session[:user_id].nil?
      render :layout => "home"
    else
      render :layout => "users"
    end
  end
  
  def policy
    if session[:user_id].nil?
      render :layout => "home"
    else
      render :layout => "users"
    end
  end
  
  def social
    render :layout => "application"
  end
end