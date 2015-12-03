class Stack
  attr_accessor :stack
  def initialize size
    @stack = Array.new(size)
    @top = -1
  end

  def top
    if @top!=-1
      return @stack[@top]
    else
      puts "Stack is Empty....!"
    end
  end
  def size
    return @stack.size
  end
  def pop
    if @top != -1
       pop = @stack[@top]
       @stack[@top] = nil
       @top -= 1
       return pop
    else
      puts "Stack is Empty.." 
    end
  end
  def push element
    if @top !=  @stack.size-1
      @top += 1
      @stack[@top] = element
    else
      puts "Stack is full"
    end
  end
end

stack = Stack.new(5)
puts "Pushing element 5 to stack.."
stack.push(5)
print stack.stack
puts
puts "size: #{stack.size}"
puts "top: #{stack.top}"
puts "pushing element 4 to stack..."
stack.push(4)
print stack.stack
puts
puts "pushing 3 to stack .."
stack.push(3)
print stack.stack
puts
puts "pushing 3 to stack .."
stack.push(3)
print stack.stack
puts
puts "pushing 2 to stack .."
stack.push(2)
print stack.stack
puts
puts "pushing 1 to stack .."
stack.push(1)
print stack.stack
puts
puts "pushing 0 to stack .."
stack.push(0)
print stack.stack
puts
puts "size: #{stack.size}"
puts "top: #{stack.top}"
puts "Poping element..."
puts stack.pop
puts "size: #{stack.size}"
puts "top: #{stack.top}"
puts "Poping element..."
puts stack.pop
puts "size: #{stack.size}"
puts "top: #{stack.top}"
puts "Poping element..."
puts stack.pop
puts "size: #{stack.size}"
puts "top: #{stack.top}"
puts "Poping element..."
puts stack.pop
puts "size: #{stack.size}"
puts "top: #{stack.top}"
puts "Poping element..."
puts stack.pop
puts "size: #{stack.size}"
puts "top: #{stack.top}"
puts "Poping element..."
puts stack.pop
puts "size: #{stack.size}"
puts "top: #{stack.top}"
puts "Poping element..."
puts stack.pop
puts "size: #{stack.size}"
puts "top: #{stack.top}"








