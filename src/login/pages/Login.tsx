// import type { JSX } from "keycloakify/tools/JSX";
import { useState } from "react";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
// import { useIsPasswordRevealed } from "keycloakify/tools/useIsPasswordRevealed";
import { clsx } from "keycloakify/tools/clsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';


export default function Login(props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { social, realm, url, usernameHidden, login, auth, registrationDisabled, messagesPerField } = kcContext;

    const { msg } = i18n;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);


    const getLabelUsernameOrEmail = () => {
        if (!realm.loginWithEmailAllowed) {
            return msg("username");
        }
        
        if (!realm.registrationEmailAsUsername) {
            return msg("usernameOrEmail");
        }
        
        return msg("email");
    };

    return (

        <div className="parent">
            <div className="div1">
                <h1>Hello Wolrd</h1>
            </div>

            <div className="div2">

                <Template
                    kcContext={kcContext}
                    i18n={i18n}
                    doUseDefaultCss={doUseDefaultCss}
                    classes={classes}
                    displayMessage={!messagesPerField.existsError("username", "password")}
                    headerNode={msg("loginAccountTitle")}
                    displayInfo={realm.password && realm.registrationAllowed && !registrationDisabled}
                    // infoNode={
                    //     <div id="kc-registration-container">
                    //         <div id="kc-registration">
                    //             <span>
                    //                 {msg("noAccount")}{" "}
                    //                 <a tabIndex={8} href={url.registrationUrl}>
                    //                     {msg("doRegister")}
                    //                 </a>
                    //             </span>
                    //         </div>
                    //     </div>
                    // }
                    socialProvidersNode={
                        <>
                            {realm.password && social?.providers !== undefined && social.providers.length !== 0 && (
                                <div id="kc-social-providers" className={kcClsx("kcFormSocialAccountSectionClass")}>
                                    <hr />
                                    <h2>{msg("identity-provider-login-label")}</h2>
                                    <ul className={kcClsx("kcFormSocialAccountListClass", social.providers.length > 3 && "kcFormSocialAccountListGridClass")}>
                                        {social.providers.map((...[p]) => (
                                            <li key={p.alias}>

                                                <Button
                                                    id={`social-${p.alias}`}
                                                    href={p.loginUrl}
                                                    variant="contained"
                                                    fullWidth
                                                    sx={{
                                                        width: '100%',
                                                        marginBottom: '10px',
                                                        padding: '12px 24px',
                                                        textTransform: 'none',
                                                        color: 'white',
                                                        backgroundColor: 'black', // Custom background color
                                                        '&:hover': {
                                                            backgroundColor: '#333333', // Custom hover color
                                                        },
                                                        borderRadius: '4px',
                                                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                                                        fontSize: '16px',
                                                        fontWeight: 500 ,

                                                        '& span': {
                                                            color: 'white'
                                                        },
                                                        // And the icon if needed
                                                        '& i': {
                                                            color: 'white'
                                                        }
                                                    }}
                                                    startIcon={
                                                        p.iconClasses && (
                                                            <i 
                                                                className={clsx(kcClsx("kcCommonLogoIdP"), p.iconClasses)} 
                                                                aria-hidden="true"
                                                            />
                                                        )
                                                    }
                                                >
                                                    <span
                                                        dangerouslySetInnerHTML={{ 
                                                            __html: kcSanitize(p.displayName) 
                                                        }}
                                                    />
                                                </Button>
                                                {/* <a
                                                    id={`social-${p.alias}`}
                                                    className={kcClsx(
                                                        "kcFormSocialAccountListButtonClass",
                                                        providers.length > 3 && "kcFormSocialAccountGridItem"
                                                    )}
                                                    type="button"
                                                    href={p.loginUrl}
                                                >
                                                    {p.iconClasses && <i className={clsx(kcClsx("kcCommonLogoIdP"), p.iconClasses)} aria-hidden="true"></i>}
                                                    <span
                                                        className={clsx(kcClsx("kcFormSocialAccountNameClass"), p.iconClasses && "kc-social-icon-text")}
                                                        dangerouslySetInnerHTML={{ __html: kcSanitize(p.displayName) }}
                                                    ></span>
                                                </a> */}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </>
                    }
                >
                    <div id="kc-form">
                        <div id="kc-form-wrapper">
                            {realm.password && (
                                <form
                                    id="kc-form-login"
                                    onSubmit={() => {
                                        setIsLoginButtonDisabled(true);
                                        return true;
                                    }}
                                    action={url.loginAction}
                                    method="post"
                                >
                                    {!usernameHidden && (
                                        <div className={kcClsx("kcFormGroupClass")}>
                                            {/* <label htmlFor="username" className={kcClsx("kcLabelClass")}>
                                                {!realm.loginWithEmailAllowed
                                                    ? msg("username")
                                                    : !realm.registrationEmailAsUsername
                                                    ? msg("usernameOrEmail")
                                                    : msg("email")}
                                            </label> */}
                                            
                                            <TextField
                                                label={getLabelUsernameOrEmail()}
                                                slotProps={{
                                                    inputLabel: {
                                                        sx: {
                                                            '&.Mui-focused': {
                                                                color: 'black', // Label color when focused
                                                            },
                                                        },
                                                    },
                                                }}
                                                sx={{
                                                    width: '100%' ,
                                                    '& .MuiOutlinedInput-root': {
                                                    '& fieldset': {
                                                        borderColor: 'gray', // Default border color
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: 'black', // Border color on hover
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: 'black', // Border color when focused
                                                    }}
                                                }}
                                                id="outlined-basic"
                                                variant="outlined"
                                                name="username"
                                                defaultValue={login.username ?? ""}
                                                autoComplete="username"
                                                aria-invalid={messagesPerField.existsError("username", "password")}
                                            />
                                            {/* <input
                                                tabIndex={2}
                                                id="username"
                                                className={kcClsx("kcInputClass")}
                                                name="username"
                                                defaultValue={login.username ?? ""}
                                                type="text"
                                                autoFocus
                                                autoComplete="username"
                                                aria-invalid={messagesPerField.existsError("username", "password")}
                                            /> */}
                                            {messagesPerField.existsError("username", "password") && (
                                                <span
                                                    id="input-error"
                                                    className={kcClsx("kcInputErrorMessageClass")}
                                                    aria-live="polite"
                                                    dangerouslySetInnerHTML={{
                                                        __html: kcSanitize(messagesPerField.getFirstError("username", "password"))
                                                    }}
                                                />
                                            )}
                                        </div>
                                    )}

                                    <div className={kcClsx("kcFormGroupClass")}>
                                        {/* <label htmlFor="password" className={kcClsx("kcLabelClass")}>
                                            {msg("password")}
                                        </label>
                                        <PasswordWrapper kcClsx={kcClsx} i18n={i18n} passwordInputId="password">
                                            <input
                                                tabIndex={3}
                                                id="password"
                                                className={kcClsx("kcInputClass")}
                                                name="password"
                                                type="password"
                                                autoComplete="current-password"
                                                aria-invalid={messagesPerField.existsError("username", "password")}
                                            />
                                        </PasswordWrapper>
                                        {usernameHidden && messagesPerField.existsError("username", "password") && (
                                            <span
                                                id="input-error"
                                                className={kcClsx("kcInputErrorMessageClass")}
                                                aria-live="polite"
                                                dangerouslySetInnerHTML={{
                                                    __html: kcSanitize(messagesPerField.getFirstError("username", "password"))
                                                }}
                                            />
                                        )} */}

                                        <TextField
                                            label={msg("password")}
                                            slotProps={{
                                                inputLabel: {
                                                    sx: {
                                                        '&.Mui-focused': {
                                                            color: 'black', // Label color when focused
                                                        },
                                                    },
                                                },
                                            }}
                                            sx={{ 
                                                width: '100%' ,
                                                '& .MuiOutlinedInput-root': {
                                                '& fieldset': {
                                                    borderColor: 'gray', // Default border color
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: 'black', // Border color on hover
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: 'black', // Border color when focused
                                                }}  
                                            }}
                                            id="password"
                                            name="password"
                                            type="password"
                                            variant="outlined"
                                            autoComplete="current-password"
                                            error={usernameHidden && messagesPerField.existsError("username", "password")}
                                            helperText={
                                                usernameHidden && messagesPerField.existsError("username", "password") 
                                                ? kcSanitize(messagesPerField.getFirstError("username", "password")) 
                                                : ''
                                            }
                                        />
                                    </div>

                                    <div className={kcClsx("kcFormGroupClass", "kcFormSettingClass")}>
                                        <div id="kc-form-options">
                                            {realm.rememberMe && !usernameHidden && (
                                                <div className="checkbox">
                                                    <label>
                                                        <input
                                                            tabIndex={5}
                                                            id="rememberMe"
                                                            name="rememberMe"
                                                            type="checkbox"
                                                            defaultChecked={!!login.rememberMe}
                                                        />{" "}
                                                        {msg("rememberMe")}
                                                    </label>
                                                </div>
                                            )}
                                        </div>
                                        <div className={kcClsx("kcFormOptionsWrapperClass")}>
                                            {realm.resetPasswordAllowed && (

                                            <Link 
                                                href={url.loginResetCredentialsUrl}
                                                sx={{
                                                    color: 'black', // Set the text color
                                                    textDecoration: 'none', // Remove the underline
                                                    '&:hover': {
                                                    color: 'black',
                                                    textDecoration: 'underline', // Underline on hover
                                                    textDecorationColor: 'black', // Underline color on hover
                                                    },
                                                }}
                                            >
                                                {msg("doForgotPassword")}
                                            </Link>

                                                // <span>
                                                //     <a tabIndex={6} href={url.loginResetCredentialsUrl}>
                                                //         {msg("doForgotPassword")}
                                                //     </a>
                                                // </span>
                                            )}
                                        </div>
                                    </div>

                                    <div id="kc-form-buttons" className={kcClsx("kcFormGroupClass")}>
                                        <input type="hidden" id="id-hidden-input" name="credentialId" value={auth.selectedCredential} />

                                        <Button
                                            sx={{
                                                backgroundColor: 'black',
                                                '&:hover': {
                                                    backgroundColor: '#333333'
                                                } ,
                                                width: '100%' 
                                            }}
                                            variant="contained" 
                                            disabled={isLoginButtonDisabled}
                                            name="login"
                                            type="submit"
                                        >
                                            {msg("doLogIn")}
                                        </Button>
                                        

                                        {/* <input
                                            tabIndex={7}
                                            disabled={isLoginButtonDisabled}
                                            className={kcClsx("kcButtonClass", "kcButtonPrimaryClass", "kcButtonBlockClass", "kcButtonLargeClass")}
                                            name="login"
                                            id="kc-login"
                                            type="submit"
                                            value={msgStr("doLogIn")}
                                        /> */}
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </Template>
                
            </div>
        </div>

    );
}

// function PasswordWrapper(props: { kcClsx: KcClsx; i18n: I18n; passwordInputId: string; children: JSX.Element }) {
//     const { kcClsx, i18n, passwordInputId, children } = props;

//     const { msgStr } = i18n;

//     const { isPasswordRevealed, toggleIsPasswordRevealed } = useIsPasswordRevealed({ passwordInputId });

//     return (
//         <div className={kcClsx("kcInputGroup")}>
//             {children}
//             <button
//                 type="button"
//                 className={kcClsx("kcFormPasswordVisibilityButtonClass")}
//                 aria-label={msgStr(isPasswordRevealed ? "hidePassword" : "showPassword")}
//                 aria-controls={passwordInputId}
//                 onClick={toggleIsPasswordRevealed}
//             >
//                 <i className={kcClsx(isPasswordRevealed ? "kcFormPasswordVisibilityIconHide" : "kcFormPasswordVisibilityIconShow")} aria-hidden />
//             </button>
//         </div>
//     );
// }
