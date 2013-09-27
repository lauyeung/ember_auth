class UserSerializer < ActiveModel::Serializer
  embed :ids
  attributes :id, :username, :first_name, :last_name
end
