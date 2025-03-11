class Resource {
  getbids = () => {
    return [
      {
        id: "2a860a65-d15f-48ac-b206-402af58db8ab",
        bid_price: "2000.00",
        quantity: "2.00",
        total_amt: "400.00",
        status: "accepted",
        created_at: "2025-02-21T12:37:18.095840Z",
        buyer: "admin@nhce.edu",
        listing: {
          id: "330e0308-f8ff-4255-936c-f9fd92844f59",
          AskPrice: "200.00",
          metrics: "Q",
          Qty_available: "10.00",
          seller: "admin@nhce.edu",
          produce: "Rice-sona masuri",
        },
      },
      {
        id: "2a860a65-d15f-48ac-b206-402af58db8a1",
        bid_price: "2000.00",
        quantity: "2.00",
        total_amt: "400.00",
        status: "pending",
        created_at: "2025-02-21T12:52:26.930960Z",
        buyer: "admin@nhce.edu",
        listing: {
          id: "330e0308-f8ff-4255-936c-f9fd92844f59",
          AskPrice: "200.00",
          metrics: "Q",
          Qty_available: "10.00",
          seller: "admin@nhce.edu",
          produce: "Rice-sona masuri",
        },
      },
      {
        id: "2a860a65-d15f-48ac-b206-402af58db8a2",
        bid_price: "2000.00",
        quantity: "2.00",
        total_amt: "400.00",
        status: "rejected",
        created_at: "2025-02-21T12:52:31.480898Z",
        buyer: "admin@nhce.edu",
        listing: {
          id: "330e0308-f8ff-4255-936c-f9fd92844f59",
          AskPrice: "200.00",
          metrics: "Q",
          Qty_available: "10.00",
          seller: "admin@nhce.edu",
          produce: "Rice-sona masuri",
        },
      },
    ];
  };

  gettransactions = () => {
    return [
      {
        id: "a1b2c3d4-e5f6-7890-1234-56789abcdef0",
        order_id: "111aaa22-bbbb-3333-cccc-44444dddd5555",
        payment_id: "abc12345-def6-7890-ghij-45678klmnop9",
        amount: "500.00",
        status: "successful",
        payment_method: "card",
        transaction_id: "TXN987654321",
        created_at: "2025-02-23T12:34:56Z",
        updated_at: "2025-02-23T12:45:00Z",
      },
      {
        id: "z9y8x7w6-v5u4-t3s2-r1q0-abcdef123456",
        order_id: "666fff77-gggg-8888-hhhh-99999iiii0000",
        payment_id: "uvw67890-xyz1-2345-qrst-67890abcdefg",
        amount: "1200.50",
        status: "pending",
        payment_method: "upi",
        transaction_id: "TXN123456789",
        created_at: "2025-02-22T15:20:30Z",
        updated_at: "2025-02-22T15:30:45Z",
      },
      {
        id: "abcd1234-efgh-5678-ijkl-9012mnopqrst",
        order_id: "abcd5678-ijkl-9012-mnop-qrstuvwx3456",
        payment_id: "mnop9012-qrst-3456-uvwx-7890yzabcd12",
        amount: "750.25",
        status: "failed",
        payment_method: "bank_transfer",
        transaction_id: "TXN567890123",
        created_at: "2025-02-21T10:15:40Z",
        updated_at: "2025-02-21T10:25:10Z",
      },
    ];
  };
  getlistings = () => {
    return [
      {
        id: "330e0308-f8ff-4255-936c-f9fd92844f59",
        AskPrice: "200.00",
        metrics: "Q",
        Qty_available: "10.00",
        seller: "admin@nhce.edu",
        produce: "Rice-sona masuri",
      },
      {
        id: "330e0308-f8ff-4255-936c-f9fd92844f50",
        AskPrice: "200.00",
        metrics: "Q",
        Qty_available: "10.00",
        seller: "admin@nhce.edu",
        produce: "Rice-sona masuri",
      },
      {
        id: "330e0308-f8ff-4255-936c-f9fd92844f53",
        AskPrice: "200.00",
        metrics: "Q",
        Qty_available: "10.00",
        seller: "admin@nhce.edu",
        produce: "Rice-sona masuri",
      },
      {
        id: "deb6813b-d220-49ff-ab15-bde652c8306c",
        AskPrice: "200.00",
        metrics: "Q",
        Qty_available: "10.00",
        seller: "admin@nhce.edu",
        produce: "Soyabean-Soyabeen",
      },
      {
        id: "82398f19-d14a-4111-a438-979d2d1a38b4",
        AskPrice: "200.00",
        metrics: "Q",
        Qty_available: "10.00",
        seller: "admin@nhce.edu",
        produce: "Green Gram Dal (Moong Dal)-Green gram",
      },
      {
        id: "58fc3a02-14f3-46f4-b166-e79ea1bd9cc0",
        AskPrice: "200.00",
        metrics: "Q",
        Qty_available: "10.00",
        seller: "admin@nhce.edu",
        produce: "Green Gram (Moong)(Whole)-Other",
      },
      {
        id: "330e0308-f8ff-4255-936c-f9fd92844f59",
        AskPrice: "200.00",
        metrics: "Q",
        Qty_available: "10.00",
        seller: "admin@nhce.edu",
        produce: "Rice-sona masuri",
      },
      {
        id: "330e0308-f8ff-4255-936c-f9fd92844f50",
        AskPrice: "200.00",
        metrics: "Q",
        Qty_available: "10.00",
        seller: "admin@nhce.edu",
        produce: "Rice-sona masuri",
      },
      {
        id: "330e0308-f8ff-4255-936c-f9fd92844f53",
        AskPrice: "200.00",
        metrics: "Q",
        Qty_available: "10.00",
        seller: "admin@nhce.edu",
        produce: "Rice-sona masuri",
      },
      {
        id: "deb6813b-d220-49ff-ab15-bde652c8306c",
        AskPrice: "200.00",
        metrics: "Q",
        Qty_available: "10.00",
        seller: "admin@nhce.edu",
        produce: "Soyabean-Soyabeen",
      },
      {
        id: "82398f19-d14a-4111-a438-979d2d1a38b4",
        AskPrice: "200.00",
        metrics: "Q",
        Qty_available: "10.00",
        seller: "admin@nhce.edu",
        produce: "Green Gram Dal (Moong Dal)-Green gram",
      },
      {
        id: "58fc3a02-14f3-46f4-b166-e79ea1bd9cc0",
        AskPrice: "200.00",
        metrics: "Q",
        Qty_available: "10.00",
        seller: "admin@nhce.edu",
        produce: "Green Gram (Moong)(Whole)-Other",
      },
      {
        id: "330e0308-f8ff-4255-936c-f9fd92844f59",
        AskPrice: "200.00",
        metrics: "Q",
        Qty_available: "10.00",
        seller: "admin@nhce.edu",
        produce: "Rice-sona masuri",
      },
      {
        id: "330e0308-f8ff-4255-936c-f9fd92844f50",
        AskPrice: "200.00",
        metrics: "Q",
        Qty_available: "10.00",
        seller: "admin@nhce.edu",
        produce: "Rice-sona masuri",
      },
      {
        id: "330e0308-f8ff-4255-936c-f9fd92844f53",
        AskPrice: "200.00",
        metrics: "Q",
        Qty_available: "10.00",
        seller: "admin@nhce.edu",
        produce: "Rice-sona masuri",
      },
      {
        id: "deb6813b-d220-49ff-ab15-bde652c8306c",
        AskPrice: "200.00",
        metrics: "Q",
        Qty_available: "10.00",
        seller: "admin@nhce.edu",
        produce: "Soyabean-Soyabeen",
      },
      {
        id: "82398f19-d14a-4111-a438-979d2d1a38b4",
        AskPrice: "200.00",
        metrics: "Q",
        Qty_available: "10.00",
        seller: "admin@nhce.edu",
        produce: "Green Gram Dal (Moong Dal)-Green gram",
      },
      {
        id: "58fc3a02-14f3-46f4-b166-e79ea1bd9cc0",
        AskPrice: "200.00",
        metrics: "Q",
        Qty_available: "10.00",
        seller: "admin@nhce.edu",
        produce: "Green Gram (Moong)(Whole)-Other",
      },
      {
        id: "330e0308-f8ff-4255-936c-f9fd92844f59",
        AskPrice: "200.00",
        metrics: "Q",
        Qty_available: "10.00",
        seller: "admin@nhce.edu",
        produce: "Rice-sona masuri",
      },
      {
        id: "330e0308-f8ff-4255-936c-f9fd92844f50",
        AskPrice: "200.00",
        metrics: "Q",
        Qty_available: "10.00",
        seller: "admin@nhce.edu",
        produce: "Rice-sona masuri",
      },
      {
        id: "330e0308-f8ff-4255-936c-f9fd92844f53",
        AskPrice: "200.00",
        metrics: "Q",
        Qty_available: "10.00",
        seller: "admin@nhce.edu",
        produce: "Rice-sona masuri",
      },
      {
        id: "deb6813b-d220-49ff-ab15-bde652c8306c",
        AskPrice: "200.00",
        metrics: "Q",
        Qty_available: "10.00",
        seller: "admin@nhce.edu",
        produce: "Soyabean-Soyabeen",
      },
      {
        id: "82398f19-d14a-4111-a438-979d2d1a38b4",
        AskPrice: "200.00",
        metrics: "Q",
        Qty_available: "10.00",
        seller: "admin@nhce.edu",
        produce: "Green Gram Dal (Moong Dal)-Green gram",
      },
      {
        id: "58fc3a02-14f3-46f4-b166-e79ea1bd9cc0",
        AskPrice: "200.00",
        metrics: "Q",
        Qty_available: "10.00",
        seller: "admin@nhce.edu",
        produce: "Green Gram (Moong)(Whole)-Other",
      },
      {
        id: "330e0308-f8ff-4255-936c-f9fd92844f59",
        AskPrice: "200.00",
        metrics: "Q",
        Qty_available: "10.00",
        seller: "admin@nhce.edu",
        produce: "Rice-sona masuri",
      },
      {
        id: "330e0308-f8ff-4255-936c-f9fd92844f50",
        AskPrice: "200.00",
        metrics: "Q",
        Qty_available: "10.00",
        seller: "admin@nhce.edu",
        produce: "Rice-sona masuri",
      },
      {
        id: "330e0308-f8ff-4255-936c-f9fd92844f53",
        AskPrice: "200.00",
        metrics: "Q",
        Qty_available: "10.00",
        seller: "admin@nhce.edu",
        produce: "Rice-sona masuri",
      },
      {
        id: "deb6813b-d220-49ff-ab15-bde652c8306c",
        AskPrice: "200.00",
        metrics: "Q",
        Qty_available: "10.00",
        seller: "admin@nhce.edu",
        produce: "Soyabean-Soyabeen",
      },
      {
        id: "82398f19-d14a-4111-a438-979d2d1a38b4",
        AskPrice: "200.00",
        metrics: "Q",
        Qty_available: "10.00",
        seller: "admin@nhce.edu",
        produce: "Green Gram Dal (Moong Dal)-Green gram",
      },
      {
        id: "58fc3a02-14f3-46f4-b166-e79ea1bd9cc0",
        AskPrice: "200.00",
        metrics: "Q",
        Qty_available: "10.00",
        seller: "admin@nhce.edu",
        produce: "Green Gram (Moong)(Whole)-Other",
      },
    ];
  };
}

class Authentication {
  getuser = () => {
    return {
      email: "dummy@dummy.com",
      first_name: "dummy",
      last_name: "dummy",
      phone: "0123456789",
      role: "buyer",
      type: "individual",
    };
  };
  login = async ({ email, password }) => {
    console.log(email, password);
    const data = async () => {
      return {
        data: {
          accessToken:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDllNzk1MjY0ZTdkYmEyOWI3MjY5MzYiLCJlbWFpbCI6IndhamUuc2h1YmhhbTExMUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6IndhamVzaHViaGFtIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNjg4MTA3NDY5LCJleHAiOjE2ODgxOTM4Njl9.40qfVrWi8x8fGBRB9JBVCVsdMYvlwzjIRpffz5z7DK4",
          refreshToken:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDllNzk1MjY0ZTdkYmEyOWI3MjY5MzYiLCJpYXQiOjE2ODgxMDc0NjksImV4cCI6MTY4ODk3MTQ2OX0.7or55Coj0K_UY4YpzYzkNR9hcOIhusxk9FRz7eMV8Ho",
          user: {
            _id: "649e795264e7dba29b726936",
            createdAt: "2023-06-30T06:42:26.163Z",
            email: email,
            first_name: "dummy",
            last_name: "dummy",
            role: "Buyer",
            type: "Individual",
            isEmailVerified: true,
            loginType: "EMAIL_PASSWORD",
            updatedAt: "2023-06-30T06:44:29.831Z",
          },
        },
        message: "User logged in successfully",
        statusCode: 200,
        success: true,
      };
    };
    return await data().then((res) => {
      return res;
    });
  };
  signup = ({ email, password1, password2 }) => {
    console.log(email, password1, password2);
    return {
      data: {
        createdAt: "2023-06-30T06:42:26.163Z",
        email: "user.email@domain.com",
        isEmailVerified: false,
        loginType: "EMAIL_PASSWORD",
        role: "Buyer",
        type: "Individual",
        first_name: "dummy",
        last_name: "dummy",
        updatedAt: "2023-06-30T06:42:26.247Z",
      },
      message:
        "Users registered successfully and verification email has been sent on your email.",
      statusCode: 200,
      success: true,
    };
  };
}

export const auth = new Authentication();
export const resource = new Resource();
