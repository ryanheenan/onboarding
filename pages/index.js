import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Switch } from '../components/ui/switch';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';

export default function ProgramForm() {
  const [formData, setFormData] = useState({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    clientAddress: "",
    programLength: "16",
    paymentType: "full",
    fullPaymentAmount: "5400",
    initialPaymentAmount: "",
    initialPaymentCount: "",
    subsequentPaymentAmount: "",
    subsequentPaymentCount: "",
    bonusWeeks: false,
    upgradeOption: false,
    programTotalCost: "5400"
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSwitchChange = (name) => {
    setFormData(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const hasSubsequentPayments = parseInt(formData.subsequentPaymentCount) > 0 && 
                               parseInt(formData.subsequentPaymentAmount) > 0;

  const generatePaymentText = () => {
    switch(formData.paymentType) {
      case "full":
        return `$${formData.fullPaymentAmount}`;
      case "affirm":
        return `Total program cost of $${formData.programTotalCost} financed through Affirm. The final payment terms will be determined during the Affirm checkout process. By proceeding with Affirm financing, Client agrees to complete Affirm's application process and acknowledges that all payment terms will be subject to Affirm's approval and Terms of Service.`;
      case "plan":
        const paymentText = [];
        if (formData.initialPaymentAmount && formData.initialPaymentCount) {
          paymentText.push(`${formData.initialPaymentCount} payment${parseInt(formData.initialPaymentCount) > 1 ? 's' : ''} of $${formData.initialPaymentAmount}`);
        }
        if (hasSubsequentPayments) {
          paymentText.push(`${formData.subsequentPaymentCount} payment${parseInt(formData.subsequentPaymentCount) > 1 ? 's' : ''} of $${formData.subsequentPaymentAmount}`);
        }
        return paymentText.join(", followed by ");
      default:
        return "";
    }
  };

  const generateBonusWeeksText = () => {
    if (formData.bonusWeeks) {
      const baseWeeks = parseInt(formData.programLength);
      const totalWeeks = baseWeeks + 4;
      return `Program includes ${baseWeeks} weeks plus 4 bonus weeks, for a total of ${totalWeeks} weeks.`;
    }
    return '';
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto p-4">
      {/* Rest of your component JSX... */}
      <Card>
        <CardHeader>
          <CardTitle>Client Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Client Name</Label>
              <Input
                type="text"
                name="clientName"
                value={formData.clientName}
                onChange={handleInputChange}
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                name="clientEmail"
                value={formData.clientEmail}
                onChange={handleInputChange}
                placeholder="john@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input
                type="tel"
                name="clientPhone"
                value={formData.clientPhone}
                onChange={handleInputChange}
                placeholder="(555) 555-5555"
              />
            </div>
            <div className="space-y-2">
              <Label>Address</Label>
              <Input
                type="text"
                name="clientAddress"
                value={formData.clientAddress}
                onChange={handleInputChange}
                placeholder="123 Main St, City, State 12345"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Program Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Program Length</Label>
              <RadioGroup
                defaultValue="16"
                onValueChange={(value) => handleInputChange({
                  target: { name: 'programLength', value }
                })}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="16" id="16weeks" />
                  <Label htmlFor="16weeks">16 Weeks</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="52" id="52weeks" />
                  <Label htmlFor="52weeks">52 Weeks</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Payment Type</Label>
              <RadioGroup
                defaultValue="full"
                onValueChange={(value) => handleInputChange({
                  target: { name: 'paymentType', value }
                })}
                className="flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="full" id="fullPayment" />
                  <Label htmlFor="fullPayment">Paid in Full</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="plan" id="paymentPlan" />
                  <Label htmlFor="paymentPlan">Payment Plan</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="affirm" id="affirmPayment" />
                  <Label htmlFor="affirmPayment">Finance with Affirm</Label>
                </div>
              </RadioGroup>
            </div>

            {formData.paymentType === "full" && (
              <div className="space-y-2">
                <Label>Full Payment Amount</Label>
                <Input
                  type="text"
                  name="fullPaymentAmount"
                  value={formData.fullPaymentAmount}
                  onChange={handleInputChange}
                />
              </div>
            )}

            {formData.paymentType === "affirm" && (
              <div className="space-y-2">
                <Label>Program Total Cost</Label>
                <Input
                  type="text"
                  name="programTotalCost"
                  value={formData.programTotalCost}
                  onChange={handleInputChange}
                />
                <p className="text-sm text-gray-600 mt-2">
                  Final payment terms will be determined during Affirm's checkout process. 
                  Subject to credit approval and Affirm's Terms of Service.
                </p>
              </div>
            )}

            {formData.paymentType === "plan" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Initial Payment Amount</Label>
                  <Input
                    type="text"
                    name="initialPaymentAmount"
                    value={formData.initialPaymentAmount}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Initial Payment Count</Label>
                  <Input
                    type="text"
                    name="initialPaymentCount"
                    value={formData.initialPaymentCount}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Subsequent Payment Amount</Label>
                  <Input
                    type="text"
                    name="subsequentPaymentAmount"
                    value={formData.subsequentPaymentAmount}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Subsequent Payment Count</Label>
                  <Input
                    type="text"
                    name="subsequentPaymentCount"
                    value={formData.subsequentPaymentCount}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Bonus Weeks</Label>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={formData.bonusWeeks}
                    onCheckedChange={() => handleSwitchChange('bonusWeeks')}
                  />
                  <span>{formData.bonusWeeks ? 'Yes' : 'No'}</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Upgrade Option</Label>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={formData.upgradeOption}
                    onCheckedChange={() => handleSwitchChange('upgradeOption')}
                  />
                  <span>{formData.upgradeOption ? 'Yes' : 'No'}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-lg">
            <div className="space-y-2">
              <p><strong>Client Information:</strong></p>
              <p>Name: {formData.clientName}</p>
              <p>Email: {formData.clientEmail}</p>
              <p>Phone: {formData.clientPhone}</p>
              <p>Address: {formData.clientAddress}</p>
            </div>
            <hr className="my-4" />
            <p><strong>Length of Program:</strong> {formData.programLength} weeks</p>
            <div className="space-y-2">
              <p><strong>Payment Details:</strong></p>
              <p className={formData.paymentType === "affirm" ? "text-sm" : ""}>
                {generatePaymentText()}
              </p>
            </div>
            {formData.bonusWeeks && (
              <p><strong>Bonus Weeks:</strong> {generateBonusWeeksText()}</p>
            )}
            {formData.upgradeOption && formData.programLength === "16" && (
              <p><strong>Upgrade Option:</strong> Client can upgrade to a full-year (52-week) program at a discounted rate of $5,400 total. This option is available within the first 30 days of the initial enrollment in the 16-week program.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
