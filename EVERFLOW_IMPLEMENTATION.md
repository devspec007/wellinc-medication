# Everflow Tracking Implementation

This document describes the Everflow tracking integration that has been implemented in the Wellinc project.

## Overview

Everflow tracking has been integrated to track user journey events and send server-to-server (S2S) postbacks for key conversion events.

## Implementation Details

### 1. Everflow JS SDK Integration

**Location:** `app/layout.tsx`

The Everflow click tracking SDK has been added to the root layout's `<head>` section. It:
- Loads the Everflow main.js script from `https://www.qt3fqt8trk.com/scripts/main.js`
- Initializes click tracking with URL parameters (oid, pub, sub1-sub5, tid)
- **Uses a callback function as the second parameter of `EF.click()`** to receive the `transaction_id` (EF click ID) from the Everflow response
- Automatically stores the `transaction_id` in localStorage when received
- Sends the transaction_id to the backend via `/api/everflow/store-transaction-id`

**Important:** The `EF.click()` function requires a callback function as the second parameter:
```javascript
EF.click({
  offer_id: EF.urlParameter('oid'),
  affiliate_id: EF.urlParameter('pub'),
  // ... other params
}, function(response) {
  // response.transaction_id contains the Everflow click ID
});
```

### 2. Utility Functions

**Location:** `lib/everflow.ts`

Created utility functions for:
- `getEverflowTransactionId()` - Retrieves transaction_id from localStorage
- `formatPhoneForEverflow()` - Formats phone numbers to +1XXXXXXXXXX format
- Postback functions for each event type (quiz_start, bmi, lead, add_to_cart, purchase)

### 3. API Endpoints

#### Store Transaction ID
**Location:** `app/api/everflow/store-transaction-id/route.ts`

- **POST** - Stores transaction_id from frontend
- **GET** - Retrieves stored transaction_id

**Note:** Currently uses in-memory storage. In production, this should be replaced with database storage and associated with user sessions/correlation IDs.

#### Postback Endpoint
**Location:** `app/api/everflow/postback/route.ts`

- **POST** - Fires S2S postbacks to Everflow for all event types
- Accepts event_type and relevant parameters
- Formats and sends postbacks to Everflow with proper verification token

### 4. Event Tracking Integration

#### Quiz Start
**Location:** `app/intake/height_weight/page.tsx`

- Fires when user first enters the intake flow
- Triggered on page load if not already tracked
- Event ID: 6

#### BMI
**Location:** `app/intake/height_weight/page.tsx`

- Fires when BMI is calculated after user submits height/weight
- Triggered in `handleNext()` function
- Event ID: 3

#### Lead
**Location:** `app/intake/contact/page.tsx`

- Fires when contact information is submitted (email, phone)
- Triggered after successful signup or OTP send
- Includes user data: email, firstName, lastName, phone
- Event ID: 4

#### Add to Cart
**Location:** `app/intake/checkout/page.tsx`

- Fires when checkout is initiated (after shipping address is validated)
- Triggered in `getCheckoutData()` function
- Includes user data: user_id, email, firstName, lastName, phone
- Event ID: 5

#### Purchase
**Location:** `app/intake/checkout/page.tsx`

- Fires when payment is successfully confirmed
- Triggered in `confirmPayment()` function when payment status is "succeeded" or "requires_capture"
- Includes order data: amount, order_id, email, firstName, lastName, phone
- Event ID: Purchase (no adv_event_id, uses nid only)

## Postback URLs

All postbacks are sent to: `https://www.qt3fqt8trk.com/`

### Event Parameters:

1. **Quiz Start:**
   - `nid=3910&aid=3&adv_event_id=6&transaction_id={TRANSACTION_ID}&verification_token={TOKEN}`

2. **BMI:**
   - `nid=3910&aid=3&adv_event_id=3&transaction_id={TRANSACTION_ID}&verification_token={TOKEN}`

3. **Lead:**
   - `nid=3910&aid=3&adv_event_id=4&transaction_id={TRANSACTION_ID}&verification_token={TOKEN}&user_id={PATIENTID}&adv1={EMAIL}&adv2={FIRSTNAME}&adv3={LASTNAME}&adv4={PHONE}`

4. **Add to Cart:**
   - `nid=3910&aid=3&adv_event_id=5&transaction_id={TRANSACTION_ID}&verification_token={TOKEN}&user_id={PATIENTID}&adv1={EMAIL}&adv2={FIRSTNAME}&adv3={LASTNAME}&adv4={PHONE}`

5. **Purchase:**
   - `nid=3910&transaction_id={TRANSACTION_ID}&amount={AMOUNT}&verification_token={TOKEN}&order_id={ORDERID}&adv1={EMAIL}&adv2={FIRSTNAME}&adv3={LASTNAME}&adv4={PHONE}`

## Data Flow

1. User lands on site with Everflow URL parameters
2. Everflow SDK captures click and returns transaction_id
3. Transaction_id is stored in localStorage and sent to backend
4. As user progresses through funnel, events fire postbacks to Everflow
5. Postbacks include transaction_id and relevant user/order data

## Important Notes

### Transaction ID Storage

Currently, the transaction_id storage uses in-memory Map which will be lost on server restart. **For production, you should:**

1. Store transaction_id in a database (e.g., PostgreSQL, MongoDB)
2. Associate it with user correlation_id or session_id
3. Retrieve it when needed for postbacks (especially for webhook-triggered events)

### Sending Transaction ID to Bask.io

**Requirement 3** states: "This transaction_id value (Everflow's click ID) also should be sent to bask.io via API when creating events, in order to receive it back with each webhook to the backend."

This integration should be done in your **backend webhook handlers** that receive events from bask.io. When you receive webhooks from bask.io, you should:

1. Retrieve the stored transaction_id associated with the user/order
2. Use that transaction_id when firing Everflow postbacks from webhook handlers
3. This ensures postbacks fire even if the user's browser session is closed

**Example webhook handler structure:**
```typescript
// In your backend webhook handler
export async function handleBaskWebhook(req: Request) {
  const { patientId, email, firstName, lastName, phone, orderId, amount } = req.body;
  
  // Retrieve stored transaction_id from database
  const transactionId = await getTransactionIdFromDatabase(patientId);
  
  if (transactionId) {
    // Fire Everflow postback
    await firePurchasePostback({
      transaction_id: transactionId,
      user_id: patientId,
      email,
      firstName,
      lastName,
      phone,
      amount,
      order_id: orderId,
    });
  }
}
```

### Facebook Pixel Integration (Requirement 5 & 6)

**Requirement 5** mentions passing FB Pixel ID via `sub5` parameter and using GTM triggers. This is typically handled in Google Tag Manager configuration, not in the codebase.

**Requirement 6** mentions sending other FB events via API from EF. This requires:
- FB Pixel ID
- FB Access Token

These should be configured in Everflow's dashboard, not in this codebase.

## Testing

To test the implementation:

1. Visit the site with Everflow URL parameters: `?oid=XXX&pub=XXX&sub1=XXX&sub2=XXX&sub3=XXX&sub4=XXX&sub5=XXX&tid=XXX`
2. Check browser console for transaction_id storage
3. Progress through the funnel and verify postbacks are fired
4. Check Everflow dashboard to confirm events are received

## Environment Variables

No additional environment variables are required for the current implementation. The verification token is hardcoded as per the requirements.

## Future Improvements

1. **Database Storage:** Replace in-memory storage with proper database
2. **Error Handling:** Add retry logic for failed postbacks
3. **Logging:** Add comprehensive logging for debugging
4. **Webhook Integration:** Implement backend webhook handlers to fire postbacks from bask.io events
5. **Transaction ID to Bask:** Send transaction_id when creating events with bask.io API

