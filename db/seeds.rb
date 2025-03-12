games = ["FIFA 24", "Call of Duty", "Minecraft", "League of Legends", "Fortnite"]

games.each do |game|
  Game.find_or_create_by(name: game)
end

puts " Se crearon los juegos correctamente."
