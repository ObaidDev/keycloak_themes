import { useState } from "react";
import { clsx } from "keycloakify/tools/clsx";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';



export default function LoginUsername(props: PageProps<Extract<KcContext, { pageId: "login-username.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { social, realm, url, usernameHidden, login, registrationDisabled, messagesPerField } = kcContext;

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
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("username")}
            displayInfo={realm.password && realm.registrationAllowed && !registrationDisabled}
            infoNode={
                <div id="kc-registration">
                    <span>
                        {msg("noAccount")}
                        <a tabIndex={6} href={url.registrationUrl}>
                            {msg("doRegister")}
                        </a>
                    </span>
                </div>
            }
            headerNode={msg("doLogIn")}
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
                                            <span className={clsx(kcClsx("kcFormSocialAccountNameClass"), p.iconClasses && "kc-social-icon-text")}>
                                                {p.displayName}
                                            </span>
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
                                            <span className={clsx(kcClsx("kcFormSocialAccountNameClass"), p.iconClasses && "kc-social-icon-text")}>
                                                {p.displayName}
                                            </span>
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
                                    {/* <label htmlFor="username" className={kcClsx("kcLabelClass")}>
                                        {!realm.loginWithEmailAllowed
                                            ? msg("username")
                                            : !realm.registrationEmailAsUsername
                                              ? msg("usernameOrEmail")
                                              : msg("email")}
                                    </label> */}
                                    {/* <input
                                        tabIndex={2}
                                        id="username"
                                        className={kcClsx("kcInputClass")}
                                        name="username"
                                        defaultValue={login.username ?? ""}
                                        type="text"
                                        autoFocus
                                        autoComplete="off"
                                        aria-invalid={messagesPerField.existsError("username")}
                                    />
                                    {messagesPerField.existsError("username") && (
                                        <span id="input-error" className={kcClsx("kcInputErrorMessageClass")} aria-live="polite">
                                            {messagesPerField.getFirstError("username")}
                                        </span>
                                    )} */}
                                </div>
                            )}

                            <div className={kcClsx("kcFormGroupClass", "kcFormSettingClass")}>
                                <div id="kc-form-options">
                                    {realm.rememberMe && !usernameHidden && (
                                        <div className="checkbox">
                                            <label>
                                                <input
                                                    tabIndex={3}
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
                            </div>

                            <div id="kc-form-buttons" className={kcClsx("kcFormGroupClass")}>

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
                                    tabIndex={4}
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
    );
}
