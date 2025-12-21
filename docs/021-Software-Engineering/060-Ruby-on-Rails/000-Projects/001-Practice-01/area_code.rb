places = {
  "newyork" => "212",
  "losangeles" => "213",
  "chicago" => "312",
  "houston" => "713",
  "miami" => "305",
  "sanfrancisco" => "415",
  "seattle" => "206",
  "boston" => "617",
  "atlanta" => "404",
  "denver" => "303",
  "dallas" => "214",
  "philadelphia" => "215",
  "phoenix" => "602"
}


def get_city_name(places)
  return places.keys
end

def get_area_code(places_arr, key)
  return places_arr[key]
end

## BANNER ---------------------------------------------------

50.times { print "-"}
puts
puts "Area Code Lookup"
50.times { print "-"}
puts

loop do 

  print "Do you want to lookup an area code based on city name? (Y/N): "
  resp = gets.chomp.downcase 
  
  if resp == "y"
    print "Which city do you want the area code for?"
    puts
    puts
    cities = get_city_name(places)
    puts cities
    puts 
    print "Enter the city name: "
    city_name = gets.chomp.downcase 

    if places.include?(city_name)
      puts
      puts "The Area Code for #{city_name.capitalize} is #{get_area_code(places, city_name)}"
      50.times { print "-"}
      puts
    else 
      puts
      puts "City not found in database."
      50.times { print "-"}
      puts
    end

  else 
    break
  end

end