
TableName = "tqf3"
Text = "code, thainame, engname, decription, credit, termyear_code"
Text2 = "gettqf3.rows[0]."
# TableName = input("Enter Table name: ")
# Text = input("Enter col: ")
Arr = Text.split(", ")
print("[]-----------------------------------------------")
print("[ ", end ="")
i = 0
while i < len(Arr)-1:
  print(Text2+Arr[i]+", ", end ="")
  i += 1
print(Text2+Arr[i]+" ]")

print("create-----------------------------------------------")
print("INSERT INTO "+TableName+" ( " + Text +" ) VALUES ( ", end ="")
i = 0
while i < len(Arr)-1:
  print("$"+ str(i+1) +", ", end ="")
  i += 1
print("$"+ str(i+1) +" ) RETURNING *")

print("\nupdate-----------------------------------------------")
print("UPDATE "+TableName+" SET ", end ="")
i = 0
while i < len(Arr)-1:
  print(Arr[i]+" = $"+ str(i+2) +", ", end ="")
  i += 1
print(Arr[i]+" = $"+ str(i+2) +" WHERE id = $1")

print("\nget--------------------------------------------------")
print("SELECT * FROM "+TableName)

print("\ndelete-----------------------------------------------")
print("DELETE FROM "+TableName+" WHERE id = $1")


