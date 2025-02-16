import React from 'react'
import {Button,Input,Header} from "../components/components"

export default function Home() {
  /*
 * Create form to request access token from Google's OAuth 2.0 server.
 */
function oauthSignIn() {
  // Google's OAuth 2.0 endpoint for requesting an access token
  var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

  // Create <form> element to submit parameters to OAuth 2.0 endpoint.
  var form = document.createElement('form');
  form.setAttribute('method', 'GET'); // Send as a GET request.
  form.setAttribute('action', oauth2Endpoint);

  // Parameters to pass to OAuth 2.0 endpoint.
  var params = {'client_id': '677847920838-2ektcis4o99ch4g0rud69ur3jo99prob.apps.googleusercontent.com',
                'redirect_uri': 'http://localhost:5173/',
                'response_type': 'token',
                'scope': 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid',
                'include_granted_scopes': 'true',
                'state': 'pass-through value'};

  // Add form parameters as hidden input values.
  for (var p in params) {
    var input = document.createElement('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('name', p);
    input.setAttribute('value', params[p]);
    form.appendChild(input);
  }

  // Add form to page and submit it to open the OAuth 2.0 endpoint.
  document.body.appendChild(form);
  form.submit();
}
  return (
    <div>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia quos assumenda minima tempore consequuntur libero quam, consectetur incidunt? Quas fugit ducimus repudiandae ratione assumenda consequatur deserunt, nulla nisi non numquam temporibus repellat officiis dolores nobis voluptas voluptatum, ipsa in? Eaque vel maiores minima explicabo adipisci voluptas laudantium neque atque mollitia recusandae perferendis, tempora harum iste itaque possimus dicta nemo cum accusamus sint? Perspiciatis odit reprehenderit sequi ipsa cum nulla, fuga distinctio laudantium ab dolorum ratione neque repellat maiores provident libero ad nam rem veritatis, et sit consequuntur. Commodi quas non reprehenderit quam sunt rerum tempora quibusdam id temporibus cum. Et.</p>
        {/* <Navbar></Navbar> */}
        <Button></Button>
        <Header></Header>
        <Input></Input>
        <button type="button" onClick={oauthSignIn} >Google</button>
    </div>
  )
}
