Rails.application.config.middleware.use OmniAuth::Builder do
  # provider :facebook, '593710007324797', '0a7e87a7473259e268d4713b33df0c5d', {:scope => 'publish_stream', :client_options => {:ssl => {:ca_path => '/etc/ssl/certs'}}}
  # provider :facebook, '118693381648464', 'c2fa7be2d64eee3da270df7155f34364', {:scope => 'publish_stream', :client_options => {:ssl => {:ca_path => '/etc/ssl/certs'}}}
  provider :facebook, '409074415884872', '8b64ea8efdb929e89c3a3783648f8da2', {:scope => 'publish_stream', :client_options => {:ssl => {:ca_path => '/etc/ssl/certs'}}}
  OmniAuth.config.logger = Rails.logger
end