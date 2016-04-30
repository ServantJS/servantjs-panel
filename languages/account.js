exports.ru = {
    dashboard: {
        title: 'Панель',
        pageTitle: 'Добро пожаловать в систему управления.',
        accessMsg: 'Вам доступны следующие компоненты системы:',

        managementModule: {
            users: {
                title: 'Управление пользователями',
                description: 'Создание, редактирование и удаление пользователей'
            }
        },

        ccModule: {
            title: 'Командный центр',
            description: 'Состояние сервера и агентов командного центра'
        }
    },

    cc: {
        title: 'Сервера',
        pageTitle: 'Сводная информация о командном центре',

        dt: 'Дата',
        ccName: 'Командный центр',
        ip: 'IP',
        agentsList: 'Список агентов',
        agentName: 'Агент',
        info: 'Информация',
        modulesList: 'Активные модули',
        status: 'Состояние'
    },

    signin: {
        title: 'Вход',
        formTitle: 'Вход в личный кабинет',
        help: 'Введите имя пользователя и пароль.',
        email: 'Электронная почта',
        password: 'Пароль',
        remember: 'Запомнить',

        action: 'Вход',

        forget: 'Забыли пароль?',
        forgetClick: 'не волнуйтесь, нажмите ',
        here: 'здесь',
        forgetClickEnd: ', чтобы восстановить пароль.',

        noAccount: 'Еще не зарегистрированы ?',
        createAccount: 'Создать аккаунт',

        controllerMsg: {
            incorrect: 'Неверные имя пользователя или пароль!'
        }
    },
    signup: {
        title: 'Создать аккаунт',
        formTitle: 'Создать аккаунт',
        formDescription: 'Введите ваши персональные данные:',
        email: 'Электронная почта',
        firstName: 'Имя',
        lastName: 'Фамилия',
        accountDetails: 'Ввелите данные для аккаунта:',
        password: 'Пароль',
        rPassword: 'Повторите ваш пароль',
        agree: 'Я согласен с',
        terms: 'условиями пользования',
        and: 'и',
        police: 'политикой компании',
        news: 'Получать новости',
        back: 'Назад',
        action: 'Создать',

        emailInfo: {
            title: 'ServantJS. Активация аккаунта.',
            body: 'Для активации вашего аккаунта пройдите по ссылке ниже, или скопируйте ее в адресную строку браузера:\n\n{0}\n'
        },

        controllerMsg: {
            exists: 'Имя пользователя занято!',
            complete: 'Вы успешно зарегистрировали учетную запись. Проверьте вашу почту.',
            badLogin: 'Слишком длинное имя пользователя',
            badPwd: 'Слишком длинный пароль',
            badEmail: 'Неправильно указан адрес электронной почты',
            invalidToken: 'Ключ активации является неверным',
            activateSuccess: 'Ваша учетная запись успешно активирована!'
        }
    },
    forget: {
        title: 'Восстановление пароль',
        formTitle: 'Забыли ваш пароль ?',
        formDescription: 'Введите ваш адрес электронной почты, чтобы восстановить пароль.',
        email: 'Электронная почта',
        back: 'Назад',
        action: 'Подтвердить',

        emailInfo: {
            title: 'ServantJS. Сброс пароля.',
            body: 'Вы получили это сообщение, потому что вы (или кто-то другой) запросил восстановление пароля для вашего аккаунта.\n\n' +
            'Пожалуйста, перейдите по ссылке ниже или вставьте ее в адресную строку браузера для продолжения процедуры:\n\n' +
            '{0}\n\n' +
            'Если вы не отправляли запрос на восстановление пароля, пожалуйста, проигнорируйте это сообщение и ваш пароль останется прежним.\n'
        },

        controllerMsg: {
            incorrectEmail: 'Не найдена учетная запись с данным электронным адресом',
            complete: 'Электронное письмо отправлено на {0} с дальнейшими инструкциями.'
        }
    },
    reset: {
        title: 'Восстановление пароля',
        formTitle: 'Восстановление пароля',
        formDescription: 'Введите новый пароль:',
        password: 'Пароль',
        rPassword: 'Повторите ваш пароль',
        back: 'Назад',
        action: 'Сохранить',

        emailInfo: {
            title: 'ServantJS.  Ваш пароль был изменен.',
            body: 'Здравствуйте,\n\nПароль для вашего аккаунт {0} был успешно изменен.\n'
        },

        controllerMsg: {
            invalidToken: 'Password reset token is invalid or has expired.',
            complete: 'Вы успешно смени пароль для вашей учетной записи!'
        }
    },

    task: {
        title: 'Информация о задании',
        pageTitle: 'Информация о задании',

        emptyResult: 'Пустая операция',
        operation: 'Операция',
        userName: 'Имя пользователя',
        module: 'Модуль',
        innerError: 'Внутренняя ошибка',
        report: 'Отчет',
        error: 'Ошибки'
    }
};

exports.us = {
    dashboard: {
        title: 'Dashboard',
        pageTitle: 'Welcome to control system of infrastructure.',
        accessMsg: 'You have access to next components:',

        managementModule: {
            users: {
                title: 'User\'s management',
                description: 'Creation, edition and the removal of the users'
            }
        },

        ccModule: {
            title: 'Command center',
            description: 'Common information about server and agents of the command center'
        }
    },

    cc: {
        title: 'Servers',
        pageTitle: 'Common information about  command center',

        dt: 'Date',
        ccName: 'Command center',
        ip: 'IP',
        agentsList: 'Agents list',
        agentName: 'Agent',
        info: 'Information',
        modulesList: 'Active modules',
        status: 'State'
    },

    signin: {
        title: 'Login',
        formTitle: 'Login to your account',
        help: 'Enter any username and password.',
        email: 'Email',
        password: 'Password',
        remember: 'Remember me',

        action: 'Sign In',

        forget: 'Forgot your password ?',
        forgetClick: 'no worries, click ',
        here: 'here',
        forgetClickEnd: 'to reset your password.',

        noAccount: 'Don\'t have an account yet ?',
        createAccount: 'Create an account',

        controllerMsg: {
            incorrect: 'Incorrect username or password.'
        }
    },
    signup: {
        title: 'Sign up',
        formTitle: 'Sign up',
        formDescription: 'Enter your personal details below:',
        email: 'Email',
        firstName: 'First name',
        lastName: 'Last name',
        accountDetails: 'Enter your account details below:',
        password: 'Password',
        rPassword: 'Re-type Your Password',
        agree: 'I agree to the',
        terms: 'Terms of Service',
        and: 'and',
        police: 'Privacy Policy',
        news: 'Receive news',
        back: 'Back',
        action: 'Sign Up',

        emailInfo: {
            title: 'ServantJS. Activate your account.',
            body: 'Please click on the following link, or paste this into your browser to complete the process:\n\n{0}\n'
        },

        controllerMsg: {
            exists: 'Username exist!',
            complete: 'Registration complete success. Check your email.',
            badLogin: 'Too long user name',
            badPwd: 'Too long password',
            badEmail: 'Incorrect email address',
            invalidToken: 'The activation token is invalid or has expired.',
            activateSuccess: 'Your account is successfully activated!'
        }
    },
    forget: {
        title: 'Restore password',
        formTitle: 'Forget Password ?',
        formDescription: 'Enter your e-mail address below to reset your password.',
        email: 'Email',
        back: 'Back',
        action: 'Submit',

        emailInfo: {
            title: 'ServantJS. Password reset.',
            body: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            '{0}\n\n' +
            'If you did not request this, please ignore this email and your password will remain unchanged.\n'
        },

        controllerMsg: {
            incorrectEmail: 'No account with that email address exists.',
            complete: 'An e-mail has been sent to {0} with further instructions.'
        }
    },
    reset: {
        title: 'Reset password',
        formTitle: 'Reset password',
        formDescription: 'Enter your new password:',
        password: 'Password',
        rPassword: 'Re-type Your Password',
        back: 'Back',
        action: 'Save',

        emailInfo: {
            title: 'ServantJS. Your password has been changed',
            body: 'Hello,\n\nThis is a confirmation that the password for your account {0} has just been changed.\n'
        },

        controllerMsg: {
            invalidToken: 'Password reset token is invalid or has expired.',
            complete: 'Success! Your password has been changed.'
        }
    },

    task: {
        title: 'Task\'s information',
        pageTitle: 'Task\'s information',

        emptyResult: 'Empty task',
        operation: 'Operation',
        userName: 'Username',
        module: 'Module',
        innerError: 'Inner error',
        report: 'Report',
        error: 'Error'
    }
};