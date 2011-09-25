require 'test/unit'
class Eliminator
  
  #Given n, find x where x is between 1 and n/2 and x % 4 == 0 (if x >= 4) or x % 2 == 0 (if x < 4)
  def eliminate(from)
    divisor = from < 4 ? 2 : 4
    return 0 if from % divisor == 0
    range = 1..(from/2).to_i
    range.find_all do |c|
      (from - c) % divisor == 0
    end.last
  end
end




class EliminatorTest < Test::Unit::TestCase
  def test_calculate_number_of_teams_to_eliminate_in_first_round
    e = Eliminator.new    
    assert_equal e.eliminate(2), 0
    assert_equal e.eliminate(3), 1
    assert_equal e.eliminate(4), 0
    assert_equal e.eliminate(5), 1
    assert_equal e.eliminate(6), 2
    assert_equal e.eliminate(7), 3
    assert_equal e.eliminate(8), 0
    assert_equal e.eliminate(9), 1
    assert_equal e.eliminate(10),2
    assert_equal e.eliminate(11),3
    assert_equal e.eliminate(12),0
    assert_equal e.eliminate(13),5
    assert_equal e.eliminate(14),6
    assert_equal e.eliminate(15),7
    assert_equal e.eliminate(16),0
    assert_equal e.eliminate(17),5
    assert_equal e.eliminate(18),6
    assert_equal e.eliminate(19),7
    assert_equal e.eliminate(20),0
  end  
end