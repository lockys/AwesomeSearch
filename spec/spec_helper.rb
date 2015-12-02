ENV['RACK_ENV'] = 'test'

require 'minitest/autorun'
require 'rack/test'
require 'watir-webdriver'
require "watir-webdriver/wait"
require 'headless'

include Rack::Test::Methods
