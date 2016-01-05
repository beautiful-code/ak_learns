require 'spec_helper'
require 'test'

describe Test do
  before :each do
    @test = Test.new
  end

  context :get_number do
    it "should return either 0 or 1" do
      expect([1,0]).to include(@test.get_number)
    end
  end

  context :print do
    it "should print zero if 0 else one" do
      expect(["ZERO","ONE"]).to include(@test.print)
    end
  end
end
