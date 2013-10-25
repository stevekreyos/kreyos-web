class UsersController < ApplicationController
  require 'open-uri'
  require 'json'
  
  before_filter :check_referral_parameter, :check_session, :except => ['save_settings']
  
  def activity
    @level   = []
    @daily   = JsonParser.new("activities/daily", {userid: session[:user_id]})
    @weekly  = JsonParser.new("activities/weekly", {userid: session[:user_id]})
    @monthly = JsonParser.new("activities/monthly", {userid: session[:user_id]})
    @yearly  = JsonParser.new("activities/yearly", {userid: session[:user_id]})
    @data    = JsonParser.new("activities/user/data", {userid: session[:user_id]}) 
    
    @data[0]['badge'].each do |badge|
      badge_name = badge['name']
      
      if badge_name.include?("Level")
         badge_level = "%02i" % badge['name'].split(" ")[1].to_i
         badge_name = "Level #{badge_level}"
         
         @level.push({
           name: badge_name
         })
         
      end
    end    
  end
  
  def dashboard
    @level              = []
    @check_if_expired   = JsonParser.new("check_goal_expiration", {userid: session[:user_id]})
    @dashboard          = JsonParser.new("dashboard", {userid: session[:user_id]})
    @get_goal_info      = JsonParser.new("goal_info", {userid: session[:user_id]})
    
    @dashboard[0]['badge'].each do |badge|
      badge_name = badge['name']
      
      if badge_name.include?("Level")
         badge_level = "%02i" % badge['name'].split(" ")[1].to_i
         badge_name = "Level #{badge_level}"
         
         @level.push({
           name: badge_name
         })
         
      end
    end    
  end
  
  def friends
    @counter = 1
    @counter2 = 1
    @counter3 = 1
    @diff = 0
    @curr_date        = Time.new
    @fb_friends       = JsonParser.new("friends", { userid: session[:user_id]})
    #@fb_invte_friends = JsonParser.new("friends/invite/list", { userid: session[:user_id]})
    possible = (('A'..'Z').to_a + (0..9).to_a + ('a'..'z').to_a)
    @tracker = (0...10).map { |n| possible.sample }.join
    
    url      = "http://rfp.kreyos.nesventures.net/campaigns/current"
    response = URI.parse(URI.encode(url.strip))
    json_obj = JSON.parse(open(response).read)
        
    @campaign_id = json_obj[0]['id']
    @campaign_type = json_obj[0]['type']
    @campaign_theme = json_obj[0]['theme']
    @campaign_page = json_obj[0]['page']
    @campaign_time = json_obj[0]['time']
    @email_from = json_obj[0]['email'][0]['from']
    @email_subject = json_obj[0]['email'][0]['subject']
    message = json_obj[0]['email'][0]['message']
    @email_message = message.gsub("%{referrer_email}", logged_user['name'])
    @facebook_title = json_obj[0]['facebook'][0]['facebook_title']
    @facebook_description = json_obj[0]['facebook'][0]['facebook_description']
    @twitter_description = json_obj[0]['twitter'][0]['twitter_description']
    @referral_timer = json_obj[0]['time']
    
    scURL    = "http://rfp.kreyos.nesventures.net/campaigns/get_share_count?email=#{logged_user['email']}&campaign_id=#{@campaign_id}"
    scRes    = URI.parse(URI.encode(scURL.strip))
    share_count = JSON.parse(open(scRes).read)
    @sharecount = share_count[0]['share_count']
  end
  
  def profile
    @fastest_mile     = "00:00:00"
    @longest_run      = "0 km"
    @level            = []
    
    # Kilometer
    @km_fastest_time  = JsonParser.new("profile/km/max/#{session[:user_id]}")
    
    if @km_fastest_time['km'] != nil
      # Miles
      @km_fastest_mile  = @km_fastest_time['km']/1.61
      
      # Time hh:mm:ss
      @km_convert       = convert_km_to_time(@km_fastest_time['km'])
      @km_time          = compute_time(@km_convert[:hours].to_f, @km_convert[:minutes].to_f)
      
      @fastest_mile     = @km_time[:time]
      @longest_run      = "#{@km_fastest_time['km']} km"
    end
    
    @my_profile       = JsonParser.new("profile/#{session[:user_id]}")

    @my_profile[0]['badge'].each do |badge|
      badge_name = badge['name']
      
      if badge_name.include?("Level")
         badge_level = "%02i" % badge['name'].split(" ")[1].to_i
         badge_name = "Level #{badge_level}"
         
         @level.push({
           name: badge_name
         })
         
      end
    end  
  end
  
  
  def convert_km_to_time(km)
    @km_h = 8 # Average running speed - 8 KPH
    @hours = km.to_f/@km_h.to_f
    @minutes = @hours*60
    
    return {hours: @hours.to_f, minutes: @minutes.to_f}
  end
  
  def compute_time(h, min)
    @hours = 0
    @minutes = 0
    
    if h.to_i != 0
      @hours = h.to_f * 3600
    end
    
    if min.to_i != 0
      @minutes = min.to_f * 60
    end
    
    @seconds = @hours.to_f + @minutes.to_f
    
    @t = Time.at(@seconds.to_f).utc.strftime("%H:%M:%S")
    return {time: @t}
  end


  
  def settings
    @settings     = JsonParser.new("settings/#{session[:user_id]}")
    
    if !@settings['basic_info'][0]['birthday'].nil?
      @year   = @settings['basic_info'][0]['birthday'].split("-")[0]
      @month  = @settings['basic_info'][0]['birthday'].split("-")[1]
      @day    = @settings['basic_info'][0]['birthday'].split("-")[2]
    else
      @year   = "Year"
      @month  = 0
      @day    = "Day"
    end
    
    #return render :json => "#{@year} - #{@month} - #{@day}"
    
    @height_unit  = @settings['dimentions'][0]['height']['unit']
    @weight_unit  = @settings['dimentions'][0]['weight']['unit']
  end
  
  def badges
    @badges = JsonParser.new("badges", { userid: session[:user_id] })
  end
  
  def graph
    
  end
  
  def save_settings
    @settings = JsonParser.new("settings/save/#{session[:user_id]}", params[:user])
    
    if @settings['result'] == "Success"
      flash[:notification] = "Settings have been updated"
    else
      flash[:notification] = "Updating settings failed"
    end
    
    redirect_to :action => "settings"
  end
  
  def fb_invite_friends
    @reward = JsonParser.new("friends/fb_invite_friends_achievement", {userid: session[:user_id]})
    return render :json => @reward
  end
  
  def get_contacts
    #http://localhost:3001/friends/get-contacts?email_type=gmail&email=email.com&password=password
    @contact_list = JsonParser.new("friends/get_contact_list", { email_type: params[:email_type], email: params[:email], password: params[:password] })       
    render :json => @contact_list
  end
  
  def send_email_invitation    
    params[:data].each do |email|
      @invitation = JsonParser.new("friends/send_email_invitation", {email: email, userid: session[:user_id]})
    end
    
    render :json => @invitation
  end
  
  def save_friend
    @friend = JsonParser.new("friends/save_friend" , {friend_uid: params[:uid], userid: session[:user_id]})
    render :json => @friend
  end
  
  def delete_friends
    @friend = JsonParser.new("friends/delete", { friend_uid: params[:friend_uid], userid: session[:user_id] })
    flash[:notification] = "Friend successfully deleted"
    redirect_to :action => 'friends'
  end
  
  def save_goals
    #return render :json => params
    #goals = JsonParser.new("dashboard/save_goals", {userid: session[:user_id], description: params[:description], calories: params[:calories], distance: params[:distance], steps: params[:steps], expires: params[:expires]})
    goals = JsonParser.new("dashboard/save_goals/#{session[:user_id]}", params[:goal] )
    if !goals.nil?
      flash[:notification] = "Goal successfully created"
      redirect_to :action => 'dashboard'
    else
      flash[:notification] = "An error occured while saving your goals"
    end
  end   
  
  def save_edit_goals
    goal = JsonParser.new("dashboard/save_edit_goals/#{session[:user_id]}", params[:egoal])
    flash[:notification] = "Goal successfully updated"
    redirect_to :action => 'dashboard'
  end
  
  def delete_goal
    goal = JsonParser.new("dashboard/delete_goal", {goalID: params[:goalID]})
    flash[:notification] = "Goal successfully deleted"
    redirect_to :action => 'dashboard'
  end
  
  def home
    
  end
  
  def save_profile
    if params[:profile] == 'about_me' || params[:profile] == 'distance'
      profile = JsonParser.new("attributes/save", { userid: session[:user_id], profile: params[:profile], value: params[:value]})
      session[:modal_distance] = nil
      
    elsif params[:profile] == 'height' || params[:profile] == 'weight'
      profile = JsonParser.new("attributes/save", { userid: session[:user_id], profile: params[:profile], value: params[:value], unit: params[:unit]})
      
      if params[:profile] == 'height'
        session[:modal_height] = nil
      elsif params[:profile] == 'weight'
        session[:modal_weight] = nil
      end
      
    elsif params[:profile] == 'country'
      profile = JsonParser.new("attributes/save", { userid: session[:user_id], profile: params[:profile], country: params[:country], state: params[:state], city: params[:city], zip: params[:zip]})
      session[:modal_country] = nil
    elsif params[:profile] == 'complete'
      profile = JsonParser.new("attributes/save", { userid: session[:user_id], profile: params[:profile] })
      session[:profile] = nil
    end
    render :json => profile
  end    
end

