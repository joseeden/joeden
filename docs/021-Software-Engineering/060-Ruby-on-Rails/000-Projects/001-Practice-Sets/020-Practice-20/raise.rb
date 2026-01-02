class BankAccount
  attr_accessor :balance

  def initialize
    @balance = 0
  end

  def deposit(amount)
    @balance += amount
  end

  def withdraw(amount)
    raise "Insufficient balance" if amount > balance
    @balance -= amount
    puts "Withdrew #{amount}"
  end
end

account = BankAccount.new

puts account.deposit(100)
puts account.withdraw(30)
puts account.withdraw(200)