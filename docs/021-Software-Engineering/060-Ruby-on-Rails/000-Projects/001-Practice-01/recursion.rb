# puts  "straw".reverse 



def reverse_string(str)
  first_index = 0
  last_index = str.length - 1
  reversed_text = ""

  while last_index >= first_index
    reversed_text << str[last_index]
    last_index -= 1
  end

  return reversed_text
end


puts reverse_string("straw")