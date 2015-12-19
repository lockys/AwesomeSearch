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
      @browser.title.must_equal 'Awesome-Search'
    end

    it 'check home page' do
      @browser.image(class: 'home-button').click

      @browser.wait_until { @browser.h1.text.must_equal "Awesome Search" }
    end

    describe 'Do search' do
      it 'should show awesome ruby' do
        @browser.text_field(class: 'cate-input').set('ruby')

        @browser.link(text: 'Ruby').when_present.click

        # @browser.wait_until { @browser.h1.text.include? "Awesome Ruby"}
      end
    end

    describe 'Click JavaScript button' do
      it 'should click a JavaScript link' do
        # @browser.strong(text: ' Programming Languages').click
        # @browser.link(text: ' JavaScript').when_present.click

        # @browser.wait_until { @browser.h1.text.include? "Awesome JavaScript"}
      end
    end

    describe 'Searching with python keyword' do
      it 'can search a awesome-python' do
        @browser.text_field(class: 'cate-input').set('python')

        @browser.link(text: 'Python').when_present.click

        # @browser.wait_until { @browser.h1.text.include? "Awesome Python"}
      end
    end

  end

  # after do
  #   @browser.close
  #   @headless.destroy
  # end
end
