class Account < ActiveRecord::Base
  
  attr_accessible :id, :email, :password, :status, :admin_type, :created_at, :updated_at
  
  
end