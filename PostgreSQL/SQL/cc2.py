
TableName = "tqf3"
Text = "code, thainame, engname, decription, credit, termyear_code"
Text2 = ""
# TableName = input("Enter Table name: ")
# Text = input("Enter col: ")
Arr = Text.split(", ")
print("req.body-----------------------------------------------\n")
print("const { ", end ="")
i = 0
while i < len(Arr)-1:
  print(Text2+Arr[i]+", ", end ="")
  i += 1
print(Text2+Arr[i]+" } = req.body;")

print("\ncreate-----------------------------------------------\n")
print("const new"+TableName+" = await pool.query(\"INSERT INTO "+TableName+" ( " + Text +" ) VALUES ( ", end ="")
i = 0
while i < len(Arr)-1:
  print("$"+ str(i+1) +", ", end ="")
  i += 1
print("$"+ str(i+1) +" ) RETURNING *\", ", end ="")
print("[ ", end ="")
i = 0
while i < len(Arr)-1:
  print(Text2+Arr[i]+", ", end ="")
  i += 1
print(Text2+Arr[i]+" ] );")

print("\nupdate-----------------------------------------------\n")
print("const update"+TableName+" = await pool.query(\"UPDATE "+TableName+" SET ", end ="")
i = 0
while i < len(Arr)-1:
  print(Arr[i]+" = $"+ str(i+2) +", ", end ="")
  i += 1
print(Arr[i]+" = $"+ str(i+2) +" WHERE id = $1 \", ", end ="")
print("[ ", end ="")
i = 0
while i < len(Arr)-1:
  print(Text2+Arr[i]+", ", end ="")
  i += 1
print(Text2+Arr[i]+" ] );")

print("\nget--------------------------------------------------\n")
print("SELECT * FROM "+TableName)

print("\ndelete-----------------------------------------------\n")
print("DELETE FROM "+TableName+" WHERE id = $1")


