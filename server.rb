require 'rubygems'
require 'sinatra'

set :environment, :production
set :port, 1234

get '/' do
  File.read(File.join('public', 'index.html'))
end