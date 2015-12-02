ENV['RACK_ENV'] = 'test'

require 'minitest/autorun'
require 'rack/test'
require 'watir-webdriver'
require 'headless'

include Rack::Test::Methods
