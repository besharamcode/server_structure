import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { resend } from "../utils/mail.js";

export const orderConfirm = asyncHandler(async (req, res) => {
  const { menu, quantity, name, email, mobile, address, transactionImg } =
    req.body;

  console.log(menu, quantity, name, email, mobile, address, transactionImg);

  if (!menu || !quantity || !name || !email || !mobile || !address) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "Please fill all the fields"));
  } else {
    const ownerResponse = await resend.emails.send({
      from: process.env.EMAIL,
      to: "Besharamcode <besharamcode@gmail.com>",
      subject: "New Order",
      text: `A new order has been placed with the following details: \n\nName: ${name} \nEmail: ${email} \nMobile: ${mobile} \nQuantity: ${quantity} \nAddress: ${address}\n\n menu: ${menu} \n\n Transaction Image: ${transactionImg}`,
      attachments: [
        {
          filename: transactionImg,
          path: transactionImg,
        },
      ],
    });
    const clientResponse = await resend.emails.send({
      from: process.env.EMAIL,
      to: email,
      subject: "Order Confirmation",
      text: `Thank you ${name} for your order. We will deliver your order as soon as possible.`,
    });
    console.log(ownerResponse, clientResponse);
    return res
      .status(201)
      .json(new ApiResponse(201, {}, "order created successfully"));
  }
});

export const orderImgUpload = asyncHandler(async (req, res) => {
  return res.status(201).json(new ApiResponse(201, req.file, "image uploaded"));
});
