require 'rubygems'
require 'nokogiri'
require 'watir'
class SearchResults
  include Nokogiri
  include Watir
  require 'open-uri'
  attr_reader :doc,:html
  $base_url = "https://www.google.com"
  def initialize query
    query = query.tr(" ","+")
    url = $base_url + "/#q=" + query.to_s
    $browser = Watir::Browser.new(:chrome)
    $browser.goto url
    sleep(10)
    html = $browser.html
    $doc = Nokogiri::HTML(html)
  end
  def size
    return $doc.css('.srg .g .rc').count
  end
  def results sr
    return sr.results
  end
  def close
    $browser.close
  end
end

class SearchResult
  def results
    arr = $doc.css('.srg .g .rc')
    results = Array.new(arr.count)
    for i in 0...arr.count do
      a = Hash.new
      a[:title] = arr[i].css('a').text
      a[:url] = arr[i].css('cite').text
      a[:desc] = arr[i].css('span').text
      results[i] = a
    end
    return results
  end
end


search = SearchResults.new("ruby oops")
puts search.size
sr = SearchResult.new
puts "Results of first page"
search.results(sr).each { |x| puts "Title: #{x[:title]}"; puts "Desc: #{x[:desc]}"; puts "URL: #{ x[:url]}";}

sleep(10)
search.close

