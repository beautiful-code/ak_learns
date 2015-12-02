class Player
  attr_accessor :name
  def initialize name
    @name = name
  end
  def self.team
    return "Team India"
  end
end

striker = Player.new("Sehwag")
non_striker = Player.new("Sachin")

puts "Openers are ..."

puts "#{striker.name} from #{Player.team} and #{non_striker.name} from #{Player.team}"

puts "Setting my striker name to Gilchrist.."

striker.name = "Gilchrist"
puts striker.name

