require "minitest/autorun"

def sum(a, b)
  a + b 
end

class TestMath < Minitest::Test 
  def test_sum
    assert_equal 7, sum(5, 2)
  end

  def test_sum_2
    assert_equal 9, sum(3, 6)
  end

  def test_sum_3
    assert_equal 11, sum(3, 6)
  end

  def test_sum_4
    assert_equal 11, sum(1, 0)
  end

  def test_sum_5
    assert_equal 11, sum(-1, nil)
  end
end 