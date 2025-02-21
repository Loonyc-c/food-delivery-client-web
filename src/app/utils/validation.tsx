export const emailValidation = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
        return "Мэйл хаягаа оруулна уу !";
    } else if (!emailRegex.test(email)) {
        return "Зөв мэйл хаяг оруулна уу !";
    }

    return "";
};

export const passwordValidation = (passwordValue:string,confirmPasswordValue:string ) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;

    if (!passwordValue) {
        return "Нууц үгээ оруулна уу!"
    } else if (passwordValue.length < 6) {
        return "Нууц үг дор хаяж 6 тэмдэгттэй байх ёстой!"
    } else if (!passwordRegex.test(passwordValue)) {
        return "Нууц үг нь том, жижиг үсэг, тоо, тусгай тэмдэгт агуулсан байх ёстой!"
    } else if (passwordValue !== confirmPasswordValue) {
        return "Нууц үг таарахгүй байна!"
    }
    return ""

}