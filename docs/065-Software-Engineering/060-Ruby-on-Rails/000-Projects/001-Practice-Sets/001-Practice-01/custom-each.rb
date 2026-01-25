# my_list = [10, 20, 30]

# my_list.each do
#   |number| puts "The square of #{number} is #{number * number}"
# end




my_list = [10, 20, 30]

def custom_each(array)
  i = 0
  while i < array.length
    yield(array[i])
    i += 1
  end
end

custom_each(my_list) do 
  |number| puts "The square of #{number} is #{number * number}"
end
