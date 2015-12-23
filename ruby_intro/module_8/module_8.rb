require 'rubygems'
require 'nokogiri'
require 'watir'
class SearchResults
  include Nokogiri
  include Watir
  require 'open-uri'
  attr_reader :doc,:html
  BASE_URL = "https://www.google.com"

  attr_accessor :results

  def initialize query
    query = query.tr(" ","+")
    url = SearchResults::BASE_URL + "/#q=" + query.to_s
    browser = Watir::Browser.new(:chrome)
    browser.goto url
    sleep(10)
    html = browser.html
    doc = Nokogiri::HTML(html)

    @results = Array.new
    doc.css('.srg .g .rc').each do |single_result|
      @results << SearchResult.new( {:title => single_result.css('a').text, :desc => single_result.css('cite').text, :url => single_result.css('span').text })
    end
    browser.close
  end

  def size
    return @results.count
  end

end

class SearchResult
  attr_accessor :title, :desc, :url

  def initialize data_hash

   @title = data_hash[:title]
   @desc  = data_hash[:desc]
   @url   = data_hash[:url]
  end
end


search = SearchResults.new("ruby oops")
puts "Number of results: #{search.size}"
puts "Results of first page"

search.results.each { |result| puts "Title: #{result.title}, Desc: #{result.desc}, URL: #{result.url}" }

#search.close

