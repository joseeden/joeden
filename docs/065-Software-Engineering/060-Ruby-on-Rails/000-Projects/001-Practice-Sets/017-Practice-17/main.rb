def gen_uniq_phone_nums
  phone_nums = Set.new 

  File.open('customers.txt').each do |customer|
    newline = customer.chomp 
    elems = newline.split(',')
    nums = elems[1]
    phone_nums.add(nums)
  end

  phone_nums
end

report_page = gen_uniq_phone_nums

puts report_page
puts report_page.length