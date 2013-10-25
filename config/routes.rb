Web::Application.routes.draw do
  #root :to => "public#login"
  root :to => "home#home"
  
  # =>  public
  match "auth/facebook/callback" => "public#facebook_authentication"
  match "rewards"                => "public#rewards"
  match "offers"                 => "public#offers"
  match "about"                  => "public#about"
  match "blog"                   => "public#blog"
  match "help"                   => "public#help"
  match "social"                 => "public#social"
  match "terms"                  => "public#terms"
  match "policy"                 => "public#policy"
  # =>  Application 
  match "signout" => 'application#signout'
  
  # =>  Users
  #match "home"                    => "users#home"
  match "dashboard"               => "users#dashboard"
  match "activities"              => "users#activity"
  match "friends"                 => "users#friends"
  match "profile"                 => "users#profile"
  match "settings"                => "users#settings"
  match "badges"                  => "users#badges" 
  match "settings/save"           => "users#save_settings"
  match "facebook/invite_friends" => "users#fb_invite_friends"
  match "friends/get-contacts"    => "users#get_contacts"
  match "send_email_invitation"   => "users#send_email_invitation"
  match "friends/save/friend"     => "users#save_friend"
  match "friends/remove"          => "users#delete_friends"
  match "save_goals"              => "users#save_goals"
  match "save_edit_goals"         => "users#save_edit_goals"
  match "delete_goal"             => "users#delete_goal"
  
  
  # => Landing
  match "landing/order_id"  => "landing#order_id"
  
  # => Save profile
  match "profile/save"  => "users#save_profile"
  
  
  match "login_temp" => "home#login_temp"
  match "admin/signout" => "home#admin_signout"
  
end
