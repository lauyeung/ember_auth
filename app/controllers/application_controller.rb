class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_filter :update_sanitized_params, if: :devise_controller?

  def index
  end

  protected

  def update_sanitized_params
    devise_parameter_sanitizer.for(:sign_up) {|u| u.permit(
      :first_name, :last_name, :username, :email, :password, :password_confirmation)
    }
    devise_parameter_sanitizer.for(:sign_in) { |u| u.permit(:login, :password) }
  end
end