class Test

  def get_number
    rand(1000) %2
  end

  def print
    zero_or_one = get_number
    zero_or_one == 0 ? 'ZERO' : 'ONE'
  end

end
