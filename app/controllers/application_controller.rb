class ApplicationController < ActionController::Base
  protect_from_forgery :except => ['save_settings', 'get_contacts', 'send_email_invitation', 'delete_friends', 'save_goals', 'save_edit_goals']
  
  require 'open-uri'
  require 'json'
  require 'net/http'
  require 'net/https'
  include GeneralModule

  @@URL_campaign = "http://rfp.kreyos.nesventures.net"

  def logged_user
    @user = JsonParser.new("users/get_user_info/#{session[:user_id]}") if session[:user_id]
  end 
  
  def signout
    session[:user_id]         = nil
    session[:profile]         = nil
    session[:modal_about_me]  = nil
    session[:modal_height]    = nil
    session[:modal_weight]    = nil
    session[:modal_distance]  = nil
    session[:modal_country]   = nil
    cookies.delete :total_progress_precentage  
    
    redirect_to :controller => "home", :action => "home"
  end
  
  def check_session
    if session[:user_id] =="" || !session[:user_id] || session[:user_id].present? == false
      #redirect_to :controller => "home", :action => "home"
      redirect_to "/login.html"
    end
  end
  
  def check_admin_session
    if session[:admin_user] =="" || !session[:admin_user] || session[:admin_user].present? == false
      #redirect_to :controller => "home", :action => "home"
      redirect_to "/login.html"
    end
  end
  
  def check_if_logged_in
    if !session[:user_id].nil?
      redirect_to :controller => "users", :action => "dashboard"
      
    end
  end 
  
  def check_referral_parameter
    @fb_desc = ""
    
    unless params[:tracker].nil? || params[:tracker].empty?
      cookies[:kreyos_tracker] = { 
        :value => params[:tracker], 
        :expires => 3.months.from_now
      }
      
      cookies[:kreyos_platform] = { 
        :value => params[:platform], 
        :expires => 3.months.from_now
      }
      
      url      = "#{@@URL_campaign}/campaigns/current"
      response = URI.parse(URI.encode(url.strip))
      json_obj = JSON.parse(open(response).read)  
      rebate = json_obj[0]['incentives'][0]['incentives_rebate']
      payment_method = json_obj[0]['incentives'][0]['incentives_payment_method']
      @fb_desc = json_obj[0]['facebook'][0]['facebook_description']
      @time    = json_obj[0]['time']
      @campaign_url = json_obj[0]['page'] + "?tracker=#{params[:tracker]}&platform=#{params[:platform]}"
       
      payment_details(rebate, payment_method)
    end
  end
  
  def payment_details(rebate, payment_method)
    @rebate = ""
    @payment_method = ""
    
    case rebate.gsub(':', '')
    when "a coupon for a discount on their first purchase"
      @rebate = "Discount on first purchase"
      @payment_method = "Coupon Code: #{payment_method}"
    when "a coupon for a discount on a subsequent purchase"
      @rebate = "Discount on a subsequent purchase"
      @payment_method = "Coupon Code: <br>#{payment_method}"
    when "a rebate on their purchase"
      @rebate = "Rebate on purchase"
      @payment_method = "Payment Method: #{payment_method}"
    when "an incentive i will send using their contact details"
      @rebate = "Will send using Contact Details"
      @payment_method = "Contact Details: #{payment_method}"
    when "no incentive"
      @rebate = "No incentive"
      @payment_method = ""
    end
      
    return @rebate, @payment_method
  end
  
  def shortenURL(longURL)
    uri = URI.parse(@@GoogleAPIURL)
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    request = Net::HTTP::Post.new(uri.path, initheader = {"Content-Type" => "application/json"})
    request.body = {'longUrl' => longURL, 'key' => @@GoogleAPIKey}.to_json
    response = http.request(request)
    json_object = JSON.parse(response.body)
    
    return json_object['id']
  end
    
  helper_method :logged_user, :check_session, :check_referral_parameter, :shortenURL, :check_admin_session
end

