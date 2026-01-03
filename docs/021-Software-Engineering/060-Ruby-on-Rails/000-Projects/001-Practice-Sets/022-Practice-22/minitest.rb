require "minitest/autorun"

def sum(a, b)
  a + b 
end

class TestMath < Minitest::Test 
  def test_sum
    assert_equal 5, sum(2, 3)
  end
end