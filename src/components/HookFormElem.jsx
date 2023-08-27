import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

export function HookFormElem() {
  const schema = yup.object().shape({
    email: yup
      .string()
      .required("email должен быть")
      .matches(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "обязателен знак собака, точка и домен",
      ),
    password: yup
      .string()
      .required("Пароль должен быть")
      .matches(/^[\w_]*$/, "только буквы цифры и нижнее подчеркивание"),

    passwordConfirmation: yup
      .string()
      .required("нужно подтверждение ")
      .oneOf([yup.ref("password")], "пароли не сопадают"),
  })
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({ resolver: yupResolver(schema) })

  const onSubmit = (formData) => {
    console.log(formData)
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {errors.email?.message}
        <input
          name="email"
          type="text"
          {...register("email")}
          placeholder="enter email"
        ></input>
        <br />
        {errors.password?.message}
        <input
          name="password"
          type="password"
          {...register("password")}
          placeholder="enter password"
        ></input>
        <br />
        {errors.passwordConfirmation?.message}
        <input
          name="passwordConfirmation"
          type="password"
          placeholder="confirm password"
          {...register("passwordConfirmation")}
        ></input>
        <button type="submit" disabled={!isDirty || !isValid}>
          Отправить
        </button>
      </form>
    </div>
  )
}
