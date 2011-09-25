module HomeHelper
  def session_link
    if user_signed_in?
      link_to "Sign Out", destroy_user_session_url, :class => "session"
    else
      link_to "Sign In", new_user_session_url, :class => "session"
    end
  end
end
