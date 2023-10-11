package com.kpi.gestoslide.security.service.authentication;

import com.kpi.gestoslide.security.dto.authentication.AuthResponseModel;
import com.kpi.gestoslide.security.dto.authentication.LoginModel;
import com.kpi.gestoslide.security.dto.authentication.RegisterModel;

public interface Authenticator {
    AuthResponseModel register(RegisterModel registerModel);

    AuthResponseModel login(LoginModel loginModel);
}
