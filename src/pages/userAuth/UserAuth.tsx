import React from "react";
import { useForm } from "react-hook-form";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { register } from "../../serviceWorker";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

interface AuthDataTypes {
  email: string;
  password: string;
}

const UserAuth: React.FC = () => {
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthDataTypes>();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                // name="email"
                autoComplete="email"
                // サイトを開いた時に自動で選択される
                autoFocus
                // エラー発生時にtrueになる
                error={Boolean(errors.email)}
                // バリデーションエラー
                helperText={errors.email && errors.email.message}
                // inputRef={register({
                //   required: {
                //     value: true,
                //     message: "メールアドレスを入力してください",
                //   },
                //   pattern: {
                // value:
                //   /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/,
                // message: "メールアドレスを正しい形式で入力してください",
                //   },
                // })}
                {...register("email", {
                  required: {
                    value: true,
                    message: "メールアドレスを入力してください",
                  },
                  pattern: {
                    value:
                      /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/,
                    message: "メールアドレスを正しい形式で入力してください",
                  },
                })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                // name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                error={Boolean(errors.password)}
                // バリデーションエラー
                helperText={errors.password && errors.password.message}
                // inputRef={register({
                //   required: {
                //     value: true,
                //     message: "メールアドレスを入力してください",
                //   },
                //   pattern: {
                //     value:
                //       /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/,
                //     message: "メールアドレスを正しい形式で入力してください",
                //   },
                // })}
                {...register("password", {
                  required: {
                    value: true,
                    message: "パスワードを入力してください",
                  },
                  minLength: {
                    value: 6,
                    message: "パスワードを6文字以上で入力してください",
                  },
                })}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default UserAuth;
