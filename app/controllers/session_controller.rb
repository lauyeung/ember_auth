class SessionController < Devise::SessionsController

  def create
    user = User.find_for_database_authentication(login: params[:username])

    if user && user.valid_password?(params[:password])
      sign_in user
      @user = user
      render json: {
        user_id: user.id, username: user.username
      }, status: :created
    else
      render json: {
        errors: {
          username: "invalid username or password"
        }
      }, status: :unprocessable_entity
    end
  end

 def destroy
    signed_out = (Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name))
    render json: {
      'csrf-param' => request_forgery_protection_token,
      'csrf-token' => form_authenticity_token
    }
  end

end
