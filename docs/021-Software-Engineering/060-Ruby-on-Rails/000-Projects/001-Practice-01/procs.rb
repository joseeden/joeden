# cube_a_num = Proc.new do |num|
#   num ** 3
# end

# a = [1, 2, 3, 4, 5]
# b = [6, 7, 8, 9, 10]
# c = [11, 12, 13, 14, 15]

# p a.map(&cube_a_num)
# p b.map(&cube_a_num)
# p c.map(&cube_a_num)

# my_num = proc { |num| "#{num}" }

# my_order = ["1st", "2nd", "3rd", "4th"]

# p my_order.map(&my_num)

# cube_a_num = proc{ |num| num ** 3 }

# # Arrays
# a = [1, 2, 3, 4, 5]
# b = [6, 7, 8, 9, 10]
# c = [11, 12, 13, 14, 15]

# # Use the proc with map, prefix with &
# p a.map(&cube_a_num)
# p b.map(&cube_a_num)
# p c.map(&cube_a_num)

# cube_a_num = Proc.new do |num|
#   num ** 3
# end

# a = [1, 2, 3, 4, 5]
# b = [6, 7, 8, 9, 10]
# c = [11, 12, 13, 14, 15]

# p a.map(&cube_a_num)
# p b.map(&cube_a_num)
# p c.map(&cube_a_num)


# usd_to_cad = proc { |money| (money * 1.35).round(2) }
# usd_to_sgd = proc { |money| (money * 1.34).round(2) }
# usd_to_aud = proc { |money| (money * 1.52).round(2) }

# usd_amounts = [102, 215, 382, 441, 569]

# p usd_amounts.map(&usd_to_cad)
# p usd_amounts.map(&usd_to_sgd)
# p usd_amounts.map(&usd_to_aud)



# is_senior = proc { |age| age > 55 }

# ages = [10, 60, 83, 30, 43, 25]

# puts "Senior ages:"
# senior_ages = ages.select(&is_senior)
# puts senior_ages

# puts "Non-senior ages:"
# non_senior_ages = ages.reject(&is_senior)
# puts non_senior_ages




# def talk_about(character, &story_proc)
#   story_proc.call(character)
# end

# hero = Proc.new { |character| puts "#{character} explored the ocean bravely" }
# sub = Proc.new { |sub| puts "He captured sailors in his submarine, the #{sub}" }

# talk_about("Nemo", &hero)
# talk_about("Nautilus", &sub)


# def talk_about(character)
#   yield(character)
# end

# talk_about("Nemo") { |character| puts "#{character} explored the ocean bravely" }
# talk_about("Nautilus") { |sub| puts "He captured sailors in his submarine, the #{sub}" }


# numbers = [1, 2, 3]

# square_lambda_2 = ->(n) { n * n }
# p numbers.map(&square_lambda_2)

# my_proc = Proc.new { |name, age| puts "Name: #{name}, Age: #{age}" }
# my_lambda = ->(name, age) { puts "Name: #{name}, Age: #{age}" }

# my_lambda.call("Nemo")

# def execute(proc_or_lambda)
#   puts "Start"
#   puts proc_or_lambda.call
#   puts "End"
# end

# my_proc = Proc.new { return "Proc returned" }
# my_lambda = -> { return "Lambda returned" }

# execute(my_proc)    