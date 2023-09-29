
import jsw from "jsonwebtoken";

export const verfiytoken = async (req, res, next) => {
  let token = req.headers["authorization"];

  try {
    if (!token) {
      return res.status(404).send({ message: "TOken is missing" });
    }
    token = token.split("Bearer ")[1];
    jsw.verify(token, 'sdjhsbvchgdsvcghsdhdsvhgdsgcd', (err, decode) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
      } else {
        req.id = decode.id;
        next();
      }
    });
  } catch (err) {
    console.log("the Error is ", err);
    return res.status(500).send({ message: " internal error ", err });
  }
};