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

    it 'check home page' do
      @browser.link(text: 'Awesome Search').click

      @browser.h1.text.must_equal "require('awesome')"
    end

    # describe 'Do Search and go back to home page' do
    #   it 'can go back to home page' do
    #     @browser.text_field(class: 'awesome-input').set('ruby')
    #
    #     @browser.link(text: 'Ruby').click
    #
    #     @browser.wait_until { @browser.button(class: 'mui-btn mui-btn--raised mui-btn--danger back-button').click }
    #   end
    # end

  describe 'Search' do
    it 'can search a awesome-python' do
      @browser.text_field(class: 'awesome-input').set('python')

      @browser.link(text: 'Python').when_present.click

      @browser.wait_until { @browser.h1(class: 'mui--text-black-54 mui--text-display3 mui--text-right').text.include? "require('Python')"}
    end
  end

  end

  # after do
  #   @browser.close
  #   @headless.destroy
  # end
end
