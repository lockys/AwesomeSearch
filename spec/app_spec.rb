require_relative 'spec_helper'

describe 'Awesome Search Stories' do
  before do
    unless @browser
      @headless = Headless.new
      @browser = Watir::Browser.new
    end
    @browser.goto 'file:////'+ Dir.pwd + '/index.html'
  end

  describe 'Visiting the home page' do
    it 'finds the title' do
      @browser.title.must_equal 'Awesome Search'
    end
  end

  # after do
  #   @browser.close
  #   @headless.destroy
  # end
end
